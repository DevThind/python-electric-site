import { chromium } from 'playwright';

const base = 'http://localhost:3001';
const routes = ['/', '/services', '/work', '/about', '/contact', '/privacy', '/services/residential-electrical', '/services/commercial-electrical', '/services/construction-rewiring', '/services/panels-circuits-upgrades', '/services/lighting', '/services/repairs-maintenance', '/services/ev-chargers', '/services/electrical-restoration'];
const browser = await chromium.launch({ executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const failures = [];
page.on('pageerror', error => failures.push(`JS: ${error.message}`));
await page.addInitScript(() => { window.__lastLcp = 0; new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__lastLcp = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true }); });
for (const route of routes) {
  const response = await page.goto(`${base}${route}`, { waitUntil: 'load' });
  const info = await page.evaluate(() => ({ h1: document.querySelectorAll('h1').length, canonical: document.querySelector('link[rel=canonical]')?.href, robots: document.querySelector('meta[name=robots]')?.content, title: document.title }));
  if (response.status() !== 200 || info.h1 !== 1 || info.canonical !== `https://www.pythonelectric.ca${route}` || !info.robots?.includes('noindex')) failures.push(`${route}: ${response.status()} ${JSON.stringify(info)}`);
  console.log(`${route}: ${response.status()} ${info.title}`);
  if (route === '/') {
    const perf = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const fcp = performance.getEntriesByName('first-contentful-paint')[0];
      return { responseEndMs: Math.round(navigation.responseEnd), domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd), loadMs: Math.round(navigation.loadEventEnd), fcpMs: fcp ? Math.round(fcp.startTime) : null, lcpMs: Math.round(window.__lastLcp || 0) || null };
    });
    console.log(`local production browser timing: ${JSON.stringify(perf)}`);
  }
}
const invalid = await page.request.post(`${base}/api/quote`, { data: { name: 'X' } });
if (invalid.status() !== 400) failures.push(`Invalid form API returned ${invalid.status()}`);
const valid = { name: 'Test Client', email: 'test@example.net', phone: '', service: 'lighting', area: 'Vancouver', message: 'Please discuss a lighting installation.', website: '' };
const unconfigured = await page.request.post(`${base}/api/quote`, { data: valid });
if (unconfigured.status() !== 503) failures.push(`Unconfigured delivery returned ${unconfigured.status()}`);
await page.goto(`${base}/contact`);
await page.locator('[name=name]').fill(valid.name);
await page.locator('[name=email]').fill(valid.email);
await page.locator('[name=service]').selectOption(valid.service);
await page.locator('[name=area]').fill(valid.area);
await page.locator('[name=message]').fill(valid.message);
await page.getByRole('button', { name: /Send Request/ }).click();
await page.getByText('Enquiry delivery is not configured yet. Please try again later.').waitFor();
if (await page.locator('[name=message]').inputValue() !== valid.message) failures.push('Form lost values after delivery failure');
const robots = await page.request.get(`${base}/robots.txt`);
if (!(await robots.text()).includes('Disallow: /')) failures.push('Preview robots did not disallow indexing');
console.log(`API: invalid ${invalid.status()}, valid unconfigured ${unconfigured.status()}, entered values preserved`);
await browser.close();
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; } else console.log('production smoke checks passed');
