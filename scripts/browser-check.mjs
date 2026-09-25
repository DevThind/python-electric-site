import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browser = await chromium.launch({ executablePath: edge, headless: true });
await mkdir('notes/screenshots', { recursive: true });
const failures = [];
async function loadPageImages(page) {
  const images = page.locator('img');
  for (let i = 0; i < await images.count(); i++) {
    if (!await images.nth(i).isVisible()) continue;
    await images.nth(i).scrollIntoViewIfNeeded();
    await images.nth(i).evaluate(image => new Promise(resolve => {
      if (image.complete) return resolve();
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    }));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
}
const widths = [1440, 1024, 768, 390, 360];
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  page.on('pageerror', error => failures.push(`${width}: JS ${error.message}`));
  const response = await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await loadPageImages(page);
  if (response.status() !== 200) failures.push(`${width}: home returned ${response.status()}`);
  const state = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, inner: window.innerWidth, broken: [...document.images].filter(image => image.complete && image.naturalWidth === 0).map(image => image.src) }));
  if (state.scroll > state.inner + 1) failures.push(`${width}: horizontal overflow ${state.scroll} > ${state.inner}`);
  if (state.broken.length) failures.push(`${width}: broken images ${state.broken.join(', ')}`);
  await page.screenshot({ path: `notes/screenshots/home-${width}.png`, fullPage: true });
  console.log(`home ${width}: ${JSON.stringify(state)}`);
  await page.close();
}
for (const [route, label, width] of [['/services', 'services-desktop', 1440], ['/services/ev-chargers', 'service-mobile', 390], ['/work', 'work-desktop', 1440], ['/work', 'work-mobile', 390], ['/about', 'about-mobile', 390], ['/contact', 'contact-desktop', 1440], ['/contact', 'contact-mobile', 390]]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  page.on('pageerror', error => failures.push(`${label}: JS ${error.message}`));
  const response = await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
  await loadPageImages(page);
  const state = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, inner: window.innerWidth, broken: [...document.images].filter(image => image.complete && image.naturalWidth === 0).map(image => image.src) }));
  if (response.status() !== 200 || state.scroll > state.inner + 1 || state.broken.length) failures.push(`${label}: ${JSON.stringify(state)} status ${response.status()}`);
  await page.screenshot({ path: `notes/screenshots/${label}.png`, fullPage: true });
  console.log(`${label}: ${JSON.stringify(state)}`);
  await page.close();
}
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto('http://localhost:3000/');
await mobile.keyboard.press('Tab');
if (!(await mobile.locator('.skip-link').evaluate(node => node === document.activeElement))) failures.push('skip link is not first keyboard stop');
await mobile.getByRole('button', { name: 'Open menu' }).click();
try { await mobile.getByRole('dialog', { name: 'Navigation' }).waitFor({ state: 'visible', timeout: 3000 }); } catch { failures.push('mobile menu did not open'); }
if (!(await mobile.getByRole('button', { name: 'Close menu' }).evaluate(node => node === document.activeElement))) failures.push('mobile menu close control did not receive focus');
await mobile.keyboard.press('Escape');
try { await mobile.getByRole('dialog', { name: 'Navigation' }).waitFor({ state: 'hidden', timeout: 3000 }); } catch { failures.push('mobile menu did not close on Escape'); }
await mobile.getByRole('button', { name: 'Open menu' }).click();
await mobile.getByRole('dialog', { name: 'Navigation' }).waitFor({ state: 'visible' });
await mobile.getByRole('dialog', { name: 'Navigation' }).getByRole('link', { name: 'Lighting', exact: true }).click();
await mobile.waitForURL('**/services/lighting');
if (!mobile.url().endsWith('/services/lighting')) failures.push('mobile service link failed');
console.log(`mobile navigation: ${mobile.url()}`);
await mobile.close();
const gallery = await browser.newPage({ viewport: { width: 390, height: 844 } });
await gallery.goto('http://localhost:3000/work');
const firstPhoto = gallery.getByRole('button', { name: 'View larger image: Pendant and stair lighting' });
await firstPhoto.click();
await gallery.getByRole('dialog').waitFor({ state: 'visible' });
await gallery.keyboard.press('Escape');
await gallery.getByRole('dialog').waitFor({ state: 'hidden' });
if (!(await firstPhoto.evaluate(node => node === document.activeElement))) failures.push('gallery focus not restored after closing image');
console.log('gallery: image view and Escape close passed');
await gallery.close();
const contact = await browser.newPage({ viewport: { width: 390, height: 844 } });
await contact.goto('http://localhost:3000/contact?service=lighting');
await contact.locator('select[name=service]').waitFor();
await contact.waitForFunction(() => document.querySelector('select[name=service]')?.value === 'lighting');
if (await contact.locator('select[name=service]').inputValue() !== 'lighting') failures.push('service preselection failed');
await contact.getByRole('button', { name: /Send Request/ }).click();
if (!(await contact.getByText('Enter your name.').isVisible())) failures.push('invalid form did not show client validation');
await contact.locator('[name=name]').fill('Test Client');
await contact.locator('[name=email]').fill('test@example.net');
await contact.locator('[name=area]').fill('Vancouver');
await contact.locator('[name=message]').fill('I would like to discuss lighting in my home.');
await contact.getByRole('button', { name: /Send Request/ }).click();
await contact.getByText('Test request accepted.').waitFor();
console.log('quote form: invalid rejected; valid accepted in local test mode');
const invalidApi = await contact.request.post('http://localhost:3000/api/quote', { data: { name: 'X' } });
if (invalidApi.status() !== 400) failures.push(`invalid API expected 400, got ${invalidApi.status()}`);
await contact.close();
await browser.close();
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log('browser checks passed');
