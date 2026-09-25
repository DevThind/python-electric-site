import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:3001';
const prefix = process.argv[3] ?? 'petrol';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
});

for (const [route, width, name] of [
  ['/', 1440, `${prefix}-home-1440.png`],
  ['/', 390, `${prefix}-home-390.png`],
  ['/services', 390, `${prefix}-services-390.png`],
  ['/contact', 390, `${prefix}-contact-390.png`],
]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    for (const image of document.images) image.loading = 'eager';
  });
  await page.waitForFunction(() => [...document.images].every(image => image.complete), { timeout: 10000 });
  await page.screenshot({ path: `notes/screenshots/${name}`, fullPage: true });
  const state = await page.evaluate(() => ({
    background: getComputedStyle(document.body).backgroundColor,
    text: getComputedStyle(document.body).color,
    overflow: document.documentElement.scrollWidth > innerWidth,
  }));
  console.log(route, width, response?.status(), state);
  if (response?.status() !== 200 || state.overflow) process.exitCode = 1;
  await page.close();
}

for (const width of [320, 768, 1024]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const response = await page.goto(base, { waitUntil: 'load' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  console.log('home responsive', width, response?.status(), { overflow });
  if (response?.status() !== 200 || overflow) process.exitCode = 1;
  await page.close();
}

await browser.close();
