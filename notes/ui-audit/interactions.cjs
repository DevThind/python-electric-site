const { chromium } = require('playwright');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await page.goto('http://localhost:3000');
  await page.locator('.reference-services').screenshot({ path: path.join(__dirname, 'home-services-1440.png') });
  await page.locator('.trade-scope').screenshot({ path: path.join(__dirname, 'home-intake-1440.png') });
  await page.evaluate(() => scrollTo(0, 0));
  await page.locator('.nav-services > a').hover();
  await page.waitForTimeout(300);
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  console.log('dropdown accessibility', await page.evaluate(async () => (await axe.run('.service-popover')).violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))));
  console.log('dropdown label', await page.locator('.service-popover .eyebrow').evaluate(e => ({ color: getComputedStyle(e).color, background: getComputedStyle(e.parentElement).backgroundColor })));
  await page.setViewportSize({ width: 700, height: 900 });
  await page.mouse.move(0, 0);
  await page.evaluate(() => scrollTo(0, 1100));
  await page.waitForFunction(() => document.querySelector('.site-header.is-compact'));
  await page.getByRole('button', { name: 'Open menu' }).click();
  console.log('tablet overlay', await page.evaluate(() => ({
    backdrop: document.querySelector('.mobile-backdrop').getBoundingClientRect().toJSON(),
    panel: document.querySelector('.mobile-panel').getBoundingClientRect().toJSON(),
    outsideAtMidpoint: document.elementFromPoint(40, 500)?.outerHTML.slice(0, 250)
  })));
  await page.screenshot({ path: path.join(__dirname, 'menu-scrolled-700.png') });
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/contact?service=emergency-electrical');
  await page.route('**/api/quote', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Audit: simulated delivery failure.' }) }));
  await page.locator('[name=name]').fill('Audit Test');
  await page.locator('[name=email]').fill('audit@example.invalid');
  await page.locator('[name=area]').fill('Vancouver');
  await page.locator('[name=message]').fill('Testing the user interface without sending email.');
  await page.getByRole('button', { name: /Send Request/ }).click();
  await page.locator('.form-error-banner').waitFor();
  console.log('mocked failure', { error: await page.locator('.form-error-banner').textContent(), message: await page.locator('[name=message]').inputValue() });
  for (const route of ['/services/residential-electrical', '/services/commercial-electrical', '/services/electrical-restoration', '/privacy', '/services/lighting']) {
    const response = await page.goto('http://localhost:3000' + route);
    console.log('additional route', route, response.status(), page.url());
  }
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
