import { chromium } from 'playwright';
import { resolve } from 'node:path';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 }, reducedMotion: 'reduce' });
  await page.goto('http://localhost:3100/');
  const top = await page.locator('.site-header').evaluate(el => ({ background: getComputedStyle(el).backgroundColor, position: getComputedStyle(el).position }));
  const hero = await page.locator('.home-hero').evaluate(el => el.getBoundingClientRect().toJSON());
  await page.screenshot({ path: resolve(`notes/ui-redesign/after-home-top-${width}.png`) });
  await page.evaluate(() => scrollTo(0, 800));
  const scrolled = await page.locator('.site-header').evaluate(el => ({ background: getComputedStyle(el).backgroundColor, compact: el.classList.contains('is-compact') }));
  console.log(width, { top, heroTop: hero.top, scrolled });
  if (top.background !== 'rgba(0, 0, 0, 0)' || top.position !== 'fixed' || hero.top !== 0 || !scrolled.compact || scrolled.background === top.background) process.exitCode = 1;
  await page.close();
}
await browser.close();
