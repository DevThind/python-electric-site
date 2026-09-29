import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';

// Execute the real handler with isolated environment settings and mocked providers.
// The production smoke check separately exercises the compiled HTTP route.
const require = createRequire(import.meta.url);
function load(path, overrides = {}) {
  const source = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: path,
  }).outputText;
  const loadedModule = { exports: {} };
  new Function('require', 'module', 'exports', source)(name => overrides[name] || require(name), loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
const content = load('lib/content.ts');
const { POST } = load('app/api/quote/route.ts', { '@/lib/content': content });
const { isIndexable } = load('lib/indexing.ts');
const keys = ['NODE_ENV', 'QUOTE_TEST_MODE', 'QUOTE_TO_EMAIL', 'QUOTE_FROM_EMAIL', 'RESEND_API_KEY', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'RATE_LIMIT_SECRET', 'PUBLIC_SITE_INDEXABLE', 'VERCEL_ENV'];
const originalEnv = Object.fromEntries(keys.map(key => [key, process.env[key]]));
const originalFetch = globalThis.fetch;
const originalError = console.error;
let cases = 0;
const valid = { name: 'Test Client', email: 'test@example.net', phone: '', service: 'residential-electrical', area: 'Vancouver', message: 'Please discuss a lighting installation.', website: '' };
function configure(extra = {}) {
  for (const key of keys) delete process.env[key];
  Object.assign(process.env, { NODE_ENV: 'production', QUOTE_TEST_MODE: '1', ...extra });
}
function configuredProviders() {
  configure({ QUOTE_FROM_EMAIL: 'sender@example.net', RESEND_API_KEY: 'mock-key', UPSTASH_REDIS_REST_URL: 'https://redis.example.net/', UPSTASH_REDIS_REST_TOKEN: 'mock-token', RATE_LIMIT_SECRET: 'mock-secret' });
}
async function expect(raw, status, headers = {}) {
  const response = await POST(new Request('http://localhost/api/quote', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: typeof raw === 'string' ? raw : JSON.stringify(raw) }));
  assert.equal(response.status, status);
  cases++;
  return response.json();
}
try {
  configure();
  globalThis.fetch = async () => { throw Error('Unexpected external provider request'); };
  console.error = () => {};
  for (const raw of ['{', 'null', '[]', '"invalid"', '{}']) await expect(raw, 400);
  for (const patch of [{ name: 'X' }, { name: 'X'.repeat(101) }, { email: 'bad' }, { email: '', phone: '' }, { email: '', phone: '-------' }, { service: 'invalid-service' }, { area: '' }, { message: 'short' }, { message: 'X'.repeat(3001) }, { website: 'bot.example' }, { name: 123 }]) await expect({ ...valid, ...patch }, 400);
  await expect('X'.repeat(9000), 413);
  await expect(valid, 503); // Production must ignore QUOTE_TEST_MODE=1.
  await expect({ ...valid, email: '', phone: '+1 (604) 555-0100' }, 503);
  await expect({ ...valid, message: '\u96fb'.repeat(3000) }, 503);
  let cancelled = false;
  const stream = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(32001)); }, cancel() { cancelled = true; } });
  const oversized = await POST(new Request('http://localhost/api/quote', { method: 'POST', body: stream, duplex: 'half' }));
  assert.equal(oversized.status, 413);
  assert(cancelled, 'Oversized stream must stop being read');
  cases++;
  configure({ NODE_ENV: 'development', QUOTE_TEST_MODE: '1' });
  assert.deepEqual(await expect(valid, 200), { accepted: true, mode: 'test' });

  configuredProviders();
  let calls = [];
  let redisResult = [{ result: 1 }, { result: 1 }];
  let redisStatus = 200;
  let mailStatus = 200;
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options, payload: JSON.parse(options.body) });
    assert(options.signal instanceof AbortSignal, 'Provider calls need a timeout signal');
    return new Response(JSON.stringify(url.includes('redis.example') ? redisResult : { id: 'mock-email-id' }), { status: url.includes('redis.example') ? redisStatus : mailStatus });
  };
  assert.deepEqual(await expect(valid, 200, { 'x-forwarded-for': '203.0.113.1, 203.0.113.2' }), { accepted: true, mode: 'real' });
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, 'https://redis.example.net/multi-exec');
  assert.match(calls[0].payload[0][1], /^quote:[a-f0-9]{64}$/);
  assert.deepEqual(calls[0].payload[1], ['EXPIRE', calls[0].payload[0][1], 3600, 'NX']);
  assert.deepEqual(calls[1].payload.to, [content.site.email]);
  assert.equal(calls[1].payload.reply_to, valid.email);
  assert(calls[1].payload.text.includes('Residential electrical'));
  calls = []; redisResult = [{ result: 5 }, { result: 0 }];
  await expect({ ...valid, email: '', phone: '604 555 0100' }, 200);
  assert(!('reply_to' in calls[1].payload));
  calls = []; redisResult = [{ result: 6 }, { result: 0 }];
  await expect(valid, 429); assert.equal(calls.length, 1);
  for (const result of [{}, [{ result: 1.5 }, { result: 1 }], [{ result: 1 }, { result: 0 }], [{ result: 0 }, { result: 1 }], [{ error: 'Unavailable' }]]) {
    redisResult = result; calls = []; await expect(valid, 502); assert.equal(calls.length, 1);
  }
  redisResult = [{ result: 1 }, { result: 1 }]; redisStatus = 503;
  await expect(valid, 502);
  redisStatus = 200; mailStatus = 503;
  await expect(valid, 502);
  globalThis.fetch = async () => { throw new DOMException('Synthetic provider timeout', 'TimeoutError'); };
  await expect(valid, 502);
  configuredProviders(); delete process.env.RATE_LIMIT_SECRET;
  globalThis.fetch = async () => { throw Error('Unexpected provider request with missing limiter configuration'); };
  await expect(valid, 503);

  for (const [node, indexable, vercel, expected] of [
    ['development', '1', undefined, false], ['production', '0', undefined, false],
    ['production', '1', 'preview', false], ['production', '1', 'development', false],
    ['production', '1', 'production', true], ['production', '1', undefined, true],
  ]) {
    configure({ NODE_ENV: node, PUBLIC_SITE_INDEXABLE: indexable, ...(vercel ? { VERCEL_ENV: vercel } : {}) });
    assert.equal(isIndexable(), expected); cases++;
  }
  console.log(`${cases} quote API and indexing checks passed; all email and Redis calls were mocked.`);
} finally {
  globalThis.fetch = originalFetch;
  console.error = originalError;
  for (const key of keys) { if (originalEnv[key] === undefined) delete process.env[key]; else process.env[key] = originalEnv[key]; }
}
