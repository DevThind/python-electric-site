import { chromium } from 'playwright';
import { resolve } from 'node:path';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  await page.goto('http://localhost:3100/');
  const state = await page.evaluate(() => ({
    selectedSection: !!document.querySelector('.selected-work'),
    nextSection: document.querySelector('.home-services')?.nextElementSibling?.className,
    overflow: document.documentElement.scrollWidth > innerWidth,
  }));
  if (state.selectedSection || state.nextSection !== 'home-intro section' || state.overflow) throw Error(`Home ${width}: ${JSON.stringify(state)}`);
  await page.screenshot({ path: resolve(`notes/ui-redesign/after-home-${width}.png`), fullPage: true });
  console.log(width, state);
  await page.close();
}
const work = await browser.newPage();
const response = await work.goto('http://localhost:3100/work');
if (response.status() !== 200 || !await work.getByRole('heading', { name: /Installed lighting/ }).isVisible()) throw Error('Projects page unavailable');
console.log('Projects page retained');
await browser.close();
