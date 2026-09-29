import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = process.env.SITE_URL || 'http://127.0.0.1:3100';
const output = resolve('notes/ui-redesign');
const routes = process.env.AUDIT_ROUTES?.split(',').filter(Boolean) || ['/', '/services', '/services/residential-electrical', '/services/commercial-electrical', '/services/ev-chargers', '/services/electrical-restoration', '/work', '/about', '/contact', '/privacy'];
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const failures = [];
const links = new Set();
const records = [];
await mkdir(output, { recursive: true });
try {
  for (const route of routes) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      page.on('pageerror', error => failures.push(`${route} ${width}: ${error.message}`));
      const response = await page.goto(base + route, { waitUntil: 'load' });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map(async image => { image.loading = 'eager'; try { await image.decode(); } catch {} }));
      });
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        clipped: [...document.querySelectorAll('h1,h2,h3')].filter(el => el.scrollWidth > el.clientWidth + 1).map(el => el.textContent),
        broken: [...document.images].filter(image => !image.naturalWidth).map(image => image.src),
        cardsWithoutPhotos: [...document.querySelectorAll('.service-card')].filter(card => !card.querySelector('.service-card-photo img')).map(card => card.querySelector('h2')?.textContent),
        headings: document.querySelectorAll('h1').length,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        description: document.querySelector('meta[name="description"]')?.content,
        robots: document.querySelector('meta[name="robots"]')?.content,
        duplicateIds: [...document.querySelectorAll('[id]')].map(el => el.id).filter((id, index, ids) => ids.indexOf(id) !== index),
        links: [...document.querySelectorAll('a[href]')].map(el => el.href).filter(href => new URL(href).origin === location.origin),
      }));
      for (const href of state.links) links.add(href);
      if (response.status() !== 200 || state.overflow || state.clipped.length || state.broken.length || state.cardsWithoutPhotos.length || state.headings !== 1 || state.duplicateIds.length || !state.description || !state.robots.includes('noindex') || state.canonical !== `https://www.pythonelectric.ca${route}`) failures.push(`${route} ${width}: ${JSON.stringify(state)}`);
      let violations = [];
      if ([390, 1440].includes(width)) {
        await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
        violations = await page.evaluate(async () => (await window.axe.run()).violations.map(item => ({ id: item.id, impact: item.impact, targets: item.nodes.map(node => node.target) })));
        if (violations.length) failures.push(`${route} ${width}: axe ${JSON.stringify(violations)}`);
        await page.screenshot({ path: resolve(output, `audit-${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}-${width}.png`), fullPage: true });
      }
      records.push({ route, width, status: response.status(), ...state, links: undefined, violations });
      console.log(`${route} ${width}: ${response.status()}, ${state.broken.length} broken images, ${state.clipped.length} clipped headings, ${violations.length} accessibility violations`);
      await page.close();
    }
  }
  const page = await browser.newPage();
  for (const href of links) {
    const url = new URL(href);
    const response = await page.request.get(url.href);
    if (response.status() !== 200) failures.push(`Broken internal link: ${url.pathname}${url.search} (${response.status()})`);
    if (url.hash) {
      await page.goto(url.href);
      const exists = await page.evaluate(hash => document.getElementById(decodeURIComponent(hash.slice(1))) !== null, url.hash);
      if (!exists) failures.push(`Missing internal fragment: ${url.pathname}${url.hash}`);
    }
  }
  for (const route of ['/missing-page', '/services/missing-service', '/services/toString', '/services/constructor', '/services/__proto__']) {
    const response = await page.goto(base + route);
    if (response.status() !== 404 || !await page.getByRole('link', { name: /Back to Home/ }).isVisible()) failures.push(`404 handling failed: ${route} (${response.status()})`);
  }
  const sitemap = await page.request.get(base + '/sitemap.xml');
  if (sitemap.status() !== 200 || (await sitemap.text()).includes('<loc>')) failures.push('Preview sitemap should be valid and empty');
  const getQuote = await page.request.get(base + '/api/quote');
  assert.equal(getQuote.status(), 405, 'Quote endpoint must reject unsupported methods');
  for (const [route, expected] of [['/services/residential-electrical', '6 / 6'], ['/services/commercial-electrical', '2 / 2']]) {
    await page.goto(base + route);
    const first = page.getByRole('button', { name: /View larger image/ }).first();
    await first.click();
    const dialog = page.getByRole('dialog', { name: 'Installation photo viewer' });
    await dialog.waitFor();
    await page.getByRole('button', { name: 'Previous image' }).click();
    if (!await dialog.getByText(expected, { exact: true }).isVisible()) failures.push(`Service gallery wraparound failed: ${route}`);
    await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
    const violations = await page.evaluate(async () => (await window.axe.run()).violations.map(item => item.id));
    if (violations.length) failures.push(`Gallery dialog accessibility: ${route} ${violations}`);
    await page.keyboard.press('Escape');
    if (!await first.evaluate(el => el === document.activeElement)) failures.push(`Gallery focus restoration failed: ${route}`);
  }
  await page.close();
  await writeFile(resolve(output, 'site-audit-results.json'), JSON.stringify({ records, internalLinks: links.size, failures }, null, 2));
  assert.deepEqual(failures, []);
  const accessibilityScans = records.filter(record => [390, 1440].includes(record.width)).length;
  console.log(`Site audit passed: ${records.length} responsive page checks, ${accessibilityScans} page accessibility scans, service galleries, ${links.size} internal links, sitemap, and 404 cases.`);
} finally {
  await browser.close();
}
