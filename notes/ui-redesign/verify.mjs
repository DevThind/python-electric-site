import { chromium } from 'playwright';
import { resolve } from 'node:path';

const base = 'http://localhost:3100';
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const failures = [];
const widths = [1440, 1024, 768, 390, 360];
async function inspect(route, width, height = 900, file) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
  page.on('pageerror', error => failures.push(`${route} ${width}: ${error.message}`));
  const response = await page.goto(base + route, { waitUntil: 'load' });
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(el => new Promise(resolve => {
      if (el.complete) return resolve();
      el.addEventListener('load', resolve, { once: true });
      el.addEventListener('error', resolve, { once: true });
    }));
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(150);
  const info = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: innerWidth,
    height: document.documentElement.scrollHeight,
    h1: document.querySelector('h1')?.textContent,
    selectedWork: !!document.querySelector('.selected-work'),
    broken: [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.src),
    clipped: [...document.querySelectorAll('h1,h2,h3,button,a')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 2 || r.left < -2); }).slice(0, 4).map(el => el.textContent?.trim().slice(0, 40)),
  }));
  if (response.status() !== 200 || info.width > width + 1 || info.broken.length || info.clipped.length || (route === '/' && info.selectedWork)) failures.push(`${route} ${width}x${height}: ${JSON.stringify(info)} status ${response.status()}`);
  if (file) await page.screenshot({ path: resolve('notes/ui-redesign', file), fullPage: true });
  console.log(route, width, height, info);
  await page.close();
}
for (const width of widths) await inspect('/', width, 900, width === 1440 || width === 390 ? `after-home-${width}.png` : undefined);
await inspect('/', 844, 390);
for (const route of ['/services', '/services/ev-chargers', '/work', '/about', '/contact', '/privacy']) {
  await inspect(route, 1440, 900, route === '/contact' ? 'after-contact-1440.png' : undefined);
  await inspect(route, 390, 844, route === '/contact' ? 'after-contact-390.png' : undefined);
}
await inspect('/', 720, 900); // effective CSS width at 200% zoom on a 1440px screen

const page = await browser.newPage({ viewport: { width: 700, height: 900 }, reducedMotion: 'reduce' });
await page.goto(base);
await page.keyboard.press('Tab');
if (!await page.locator('.skip-link').evaluate(el => el === document.activeElement)) failures.push('skip link keyboard order');
await page.evaluate(() => scrollTo(0, 1000));
await page.getByRole('button', { name: 'Open menu' }).click();
const menu = page.getByRole('dialog', { name: 'Navigation' });
await menu.waitFor();
const overlay = await page.evaluate(() => ({ height: document.querySelector('.mobile-backdrop').getBoundingClientRect().height, inert: document.getElementById('main').inert, lock: document.body.style.overflow, focus: document.activeElement.getAttribute('aria-label') }));
if (overlay.height !== 900 || !overlay.inert || overlay.lock !== 'hidden' || overlay.focus !== 'Close menu') failures.push('scrolled menu: ' + JSON.stringify(overlay));
await page.keyboard.press('Shift+Tab');
if (!await menu.getByRole('link', { name: 'Request a quote' }).evaluate(el => el === document.activeElement)) failures.push('menu focus trap');
await page.mouse.click(30, 450);
await menu.waitFor({ state: 'hidden' });
await page.getByRole('button', { name: 'Open menu' }).click();
await page.keyboard.press('Escape');
if (await menu.isVisible() || !await page.getByRole('button', { name: 'Open menu' }).evaluate(el => el === document.activeElement)) failures.push('menu Escape/focus');
console.log('menu', overlay);
await page.close();

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await desktop.goto(base);
await desktop.getByText('Do I need plans before getting in touch?').click();
if (!await desktop.getByText('Photos, plans, or equipment details can be shared during follow-up.').isVisible()) failures.push('FAQ disclosure');
await desktop.getByRole('button', { name: 'Show services' }).click();
if (!await desktop.getByRole('link', { name: 'EV charger installation' }).first().isVisible()) failures.push('dropdown disclosure');
const dropdownColors = await desktop.locator('.service-popover .eyebrow').evaluate(el => ({ color: getComputedStyle(el).color, background: getComputedStyle(el.parentElement).backgroundColor }));
await desktop.keyboard.press('Escape');
if (await desktop.locator('.service-popover').count()) failures.push('dropdown Escape');
console.log('dropdown', dropdownColors);
await desktop.close();

const gallery = await browser.newPage({ viewport: { width: 390, height: 844 } });
await gallery.goto(base + '/work');
const first = gallery.getByRole('button', { name: 'View larger image: Pendant and stair lighting' });
await first.click();
const dialog = gallery.getByRole('dialog', { name: 'Installation photo viewer' });
await dialog.waitFor();
await gallery.getByRole('button', { name: 'Next image' }).click();
if (!await dialog.getByText('2 / 16').isVisible()) failures.push('gallery next/counter');
await gallery.keyboard.press('ArrowLeft');
if (!await dialog.getByText('1 / 16').isVisible()) failures.push('gallery keyboard');
await gallery.keyboard.press('Escape');
if (await dialog.isVisible() || !await first.evaluate(el => el === document.activeElement)) failures.push('gallery Escape/focus');
await gallery.close();

const contact = await browser.newPage({ viewport: { width: 390, height: 844 } });
await contact.goto(base + '/contact?service=ev-chargers');
if (await contact.locator('[name=service]').inputValue() !== 'ev-chargers') failures.push('service preselection');
await contact.getByRole('button', { name: 'Send enquiry' }).click();
if (!await contact.getByText('Enter your name.').isVisible()) failures.push('form validation');
await contact.route('**/api/quote', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Mocked delivery failure.' }) }));
await contact.locator('[name=name]').fill('Test Client');
await contact.locator('[name=phone]').fill('604 555 0100');
await contact.locator('[name=area]').fill('Vancouver');
await contact.locator('[name=message]').fill('I would like to discuss a charger installation.');
await contact.getByRole('button', { name: 'Send enquiry' }).click();
await contact.getByText('Mocked delivery failure.').waitFor();
if (await contact.locator('[name=message]').inputValue() !== 'I would like to discuss a charger installation.') failures.push('form lost values');
const formTop = await contact.locator('.quote-form').evaluate(el => Math.round(el.getBoundingClientRect().top + scrollY));
const inputSize = await contact.locator('[name=name]').evaluate(el => getComputedStyle(el).fontSize);
console.log('form', { formTop, inputSize, error: await contact.locator('.form-error-banner').textContent() });
if (inputSize !== '16px') failures.push('form input size');
await contact.close();

const reduced = await browser.newPage({ reducedMotion: 'reduce' });
await reduced.goto(base);
if (await reduced.locator('video').count()) failures.push('reduced motion video mounted');
await reduced.close();
const smallMotion = await browser.newPage({ viewport: { width: 390, height: 600 }, reducedMotion: 'no-preference' });
await smallMotion.goto(base);
if (await smallMotion.locator('video').count()) failures.push('small-screen video mounted');
await smallMotion.close();
const dataSaving = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
await dataSaving.addInitScript(() => Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: true } }));
await dataSaving.goto(base);
if (await dataSaving.locator('video').count()) failures.push('Save-Data video mounted');
await dataSaving.close();
const motion = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
await motion.goto(base);
await motion.locator('video').waitFor();
await motion.getByRole('button', { name: 'Pause background video' }).click();
if (!await motion.locator('video').evaluate(video => video.paused)) failures.push('video pause control');
await motion.evaluate(() => scrollTo(0, 1200));
await motion.evaluate(() => scrollTo(0, 0));
if (!await motion.locator('video').evaluate(video => video.paused)) failures.push('manual video pause was lost');
await motion.getByRole('button', { name: 'Play background video' }).click();
await motion.waitForTimeout(200);
if (await motion.locator('video').evaluate(video => video.paused)) failures.push('video play control');
await motion.evaluate(() => scrollTo(0, 1200));
await motion.waitForTimeout(200);
if (!await motion.locator('video').evaluate(video => video.paused)) failures.push('offscreen video did not pause');
await motion.evaluate(() => scrollTo(0, 0));
await motion.screenshot({ path: resolve('notes/ui-redesign/after-home-video-1440.png') });
await motion.close();
const zoom = await browser.newPage({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
await zoom.goto(base + '/contact');
const zoomInfo = await zoom.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, viewport: innerWidth, form: document.querySelector('.quote-form').getBoundingClientRect().toJSON() }));
console.log('200% effective zoom (720 CSS px at 1440 device px)', zoomInfo);
if (zoomInfo.scrollWidth > zoomInfo.viewport + 1 || zoomInfo.form.right > zoomInfo.viewport + 1) failures.push('200% zoom overflow');
await zoom.screenshot({ path: resolve('notes/ui-redesign/after-contact-zoom-200.png'), fullPage: true });
await zoom.close();
for (const [route, width, expand] of [
  ['/', 1440, false], ['/', 1440, true], ['/', 390, true],
  ['/services', 390, false], ['/work', 390, false], ['/contact', 390, false],
]) {
  const audit = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  await audit.goto(base + route);
  if (expand && width === 1440) await audit.getByRole('button', { name: 'Show services' }).click();
  if (expand && width === 390) await audit.getByRole('button', { name: 'Open menu' }).click();
  await audit.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
  const violations = await audit.evaluate(async () => (await window.axe.run()).violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })));
  console.log('axe', route, width, expand, violations);
  if (violations.length) failures.push(`axe ${route} ${width} expanded=${expand}: ${JSON.stringify(violations)}`);
  await audit.close();
}
await browser.close();
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; } else console.log('redesign browser checks passed');
