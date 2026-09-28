const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const out = __dirname;
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const records = [];
  const routes = [['/', 'home'], ['/services', 'services'], ['/services/ev-chargers', 'detail'], ['/work', 'work'], ['/about', 'about'], ['/contact', 'contact']];
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [route, label] of routes) {
      const response = await page.goto('http://localhost:3000' + route, { waitUntil: 'load' });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map(async image => { image.loading = 'eager'; try { await image.decode(); } catch {} }));
      });
      await page.screenshot({ path: path.join(out, `${label}-${width}.png`), fullPage: true });
      if (label === 'home' || label === 'contact') await page.screenshot({ path: path.join(out, `${label}-${width}-top.png`) });
      await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
      const a11y = await page.evaluate(async () => {
        const result = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
        return result.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, count: v.nodes.length, nodes: v.nodes.slice(0, 4).map(n => ({ target: n.target, summary: n.failureSummary })) }));
      });
      const info = await page.evaluate(() => ({
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight,
        h1: document.querySelector('h1')?.textContent,
        broken: [...document.images].filter(i => i.naturalWidth === 0).map(i => i.src),
        formY: document.querySelector('.quote-form')?.getBoundingClientRect().top,
        inputSize: document.querySelector('input') ? getComputedStyle(document.querySelector('input')).fontSize : null,
        firstCta: (() => { const e = document.querySelector('.reference-hero-actions'); return e ? { top: e.getBoundingClientRect().top, bottom: e.getBoundingClientRect().bottom } : null; })()
      }));
      const record = { route, width, status: response.status(), info, a11y, errors: [...errors] };
      records.push(record);
      console.log(JSON.stringify(record));
    }
    await page.close();
  }
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:3000', { waitUntil: 'load' });
  await mobile.waitForFunction(() => document.querySelector('video'));
  console.log('mobile video', await mobile.locator('video').evaluate(v => ({ src: v.currentSrc, paused: v.paused, display: getComputedStyle(v).display, controls: v.controls })));
  await mobile.keyboard.press('Tab');
  console.log('first keyboard stop', await mobile.evaluate(() => document.activeElement?.textContent));
  await mobile.evaluate(() => scrollTo(0, 1100));
  await mobile.waitForFunction(() => document.querySelector('.site-header.is-compact'));
  await mobile.getByRole('button', { name: 'Open menu' }).click();
  console.log('scrolled mobile menu', await mobile.evaluate(() => {
    const box = document.querySelector('.mobile-backdrop').getBoundingClientRect();
    return { height: box.height, top: box.top, width: box.width, focused: document.activeElement?.getAttribute('aria-label') };
  }));
  await mobile.screenshot({ path: path.join(out, 'menu-scrolled-390.png') });
  await mobile.keyboard.press('Escape');
  console.log('menu escape', await mobile.getByRole('button', { name: 'Open menu' }).evaluate(e => e === document.activeElement));
  await mobile.goto('http://localhost:3000/contact?service=ev-chargers');
  console.log('service prefill', await mobile.locator('select[name=service]').inputValue());
  await mobile.getByRole('button', { name: /Send Request/ }).click();
  console.log('form validation', await mobile.evaluate(() => ({ focused: document.activeElement?.getAttribute('name'), errors: [...document.querySelectorAll('.field-error')].map(e => e.textContent) })));
  await mobile.goto('http://localhost:3000/work');
  await mobile.getByRole('button', { name: /View larger image/ }).first().click();
  await mobile.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  console.log('lightbox a11y', await mobile.evaluate(async () => (await axe.run()).violations.map(v => ({ id: v.id, impact: v.impact, targets: v.nodes.map(n => n.target) }))));
  await mobile.keyboard.press('Escape');
  console.log('lightbox escape focus', await mobile.evaluate(() => document.activeElement?.getAttribute('aria-label')));
  for (const width of [360, 768, 1024]) {
    await mobile.setViewportSize({ width, height: width === 360 ? 640 : 900 });
    await mobile.goto('http://localhost:3000');
    console.log('extra width', await mobile.evaluate(() => ({ width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth, hero: document.querySelector('.reference-hero').getBoundingClientRect().height, actions: document.querySelector('.reference-hero-actions').getBoundingClientRect().toJSON() })));
  }
  await fs.writeFile(path.join(out, 'results.json'), JSON.stringify(records, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
