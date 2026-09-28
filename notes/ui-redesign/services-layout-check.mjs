import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { resolve } from 'node:path';

const phase = process.argv[2] ?? 'after';
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
for (const width of phase === 'before' ? [1440, 390] : [1899, 1688, 1440, 1024, 900, 768, 700, 600, 390, 360, 320]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto('http://127.0.0.1:3100/');
  await page.evaluate(() => document.fonts.ready);
  const section = page.locator('.home-services');
  await section.scrollIntoViewIfNeeded();
  await page.locator('.home-service-image img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  const layout = await section.evaluate(section => {
    const bounds = element => element.getBoundingClientRect();
    const heading = bounds(section.querySelector('.section-heading'));
    const cards = [...section.querySelectorAll('.home-service-card')];
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      contentWidth: bounds(section.querySelector('.shell')).width,
      centered: Math.abs(heading.x + heading.width / 2 - innerWidth / 2) < 1 && getComputedStyle(section.querySelector('.section-heading')).textAlign === 'center',
      cards: cards.map(card => {
        const rect = bounds(card);
        const body = bounds(card.querySelector('.home-service-body'));
        const text = [...card.querySelectorAll('.card-number, h3, p, .card-link')];
        return { width: rect.width, height: rect.height, href: card.getAttribute('href'), bodySize: parseFloat(getComputedStyle(card.querySelector('p')).fontSize), clipped: text.some(el => { const r = bounds(el); return r.right > body.right + 1 || r.left < body.left - 1 || r.bottom > body.bottom + 1 || el.scrollWidth > el.clientWidth + 1; }) };
      }),
    };
  });
  assert.equal(response.status(), 200);
  assert.deepEqual(errors, []);
  assert.equal(layout.overflow, false);
  assert.equal(layout.cards.length, 4);
  if (phase === 'after') {
    assert.equal(layout.centered, true);
    if (width >= 1440) assert(layout.contentWidth / width >= .94, 'Services must use at least 94% of the wide viewport');
    assert(layout.cards.every(card => !card.clipped && card.bodySize >= 16));
    assert(Math.max(...layout.cards.map(card => card.height)) - Math.min(...layout.cards.map(card => card.height)) < 1);
    assert.deepEqual(layout.cards.map(card => card.href), ['/services/residential-electrical', '/services/commercial-electrical', '/services/ev-chargers', '/services/electrical-restoration']);
    for (let i = 0; i < 4; i++) {
      await page.locator('.home-service-card').nth(i).focus();
      assert(await page.locator('.home-service-card').nth(i).evaluate(el => document.activeElement === el && getComputedStyle(el).outlineStyle !== 'none'));
    }
  }
  await page.evaluate(() => document.activeElement?.blur());
  if ([1899, 1688, 1440, 390].includes(width)) await section.screenshot({ path: resolve(`notes/ui-redesign/${phase}-services-section-${width}.png`), style: '.site-header, .skip-link { display: none !important; }' });
  console.log(JSON.stringify({ phase, width, ...layout }));
  await page.close();
}
await browser.close();
