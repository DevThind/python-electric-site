import { chromium } from 'playwright';
import { resolve } from 'node:path';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
for (const [width, height, scale] of [[1872, 849, 1], [1248, 566, 1.5], [1440, 900, 1], [1260, 700, 1], [1024, 768, 1], [768, 900, 1], [390, 844, 1], [360, 640, 1], [1024, 400, 1], [624, 283, 1]]) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale, reducedMotion: 'reduce' });
  const response = await page.goto('http://127.0.0.1:3100/');
  await page.evaluate(() => document.fonts.ready);
  const measure = () => page.evaluate(() => {
    const rect = selector => { const r = document.querySelector(selector).getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height), bottom: Math.round(r.bottom) }; };
    const headline = getComputedStyle(document.querySelector('.home-hero h1'));
    return { viewport: [innerWidth, innerHeight], overflow: document.documentElement.scrollWidth > innerWidth, hero: rect('.home-hero'), header: rect('.site-header'), headline: rect('.home-hero h1'), content: rect('.home-hero-content'), actions: rect('.hero-actions'), size: headline.fontSize, lines: Math.round(document.querySelector('.home-hero h1').getBoundingClientRect().height / parseFloat(headline.lineHeight)), headerBackground: getComputedStyle(document.querySelector('.site-header')).backgroundColor };
  });
  const current = await measure();
  await page.screenshot({ path: resolve(`notes/ui-redesign/reference-hero-${width}.png`) });
  if (response.status() !== 200 || current.overflow || current.headerBackground !== 'rgba(0, 0, 0, 0)' || current.actions.bottom > current.hero.bottom) throw Error('Hero layout regression');
  if (width >= 1024 && height > 540 && current.lines !== 3) throw Error('Desktop reference headline must have three lines');
  if (width <= 390 && current.lines > 4) throw Error('Mobile heading exceeds four lines');
  if (width === 360 && current.hero.height > height) throw Error('Mobile actions no longer fit the short viewport');
  console.log(JSON.stringify(current));
  await page.close();
}
const videoPage = await browser.newPage({ viewport: { width: 1248, height: 566 }, deviceScaleFactor: 1.5 });
await videoPage.goto('http://127.0.0.1:3100/');
await videoPage.evaluate(() => document.fonts.ready);
await videoPage.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
await videoPage.getByRole('button', { name: 'Pause background video' }).click();
await videoPage.getByRole('button', { name: 'Play background video' }).waitFor();
await videoPage.screenshot({ path: resolve('notes/ui-redesign/reference-hero-video.png') });
console.log('Desktop video playback and accessible pause control passed');
await videoPage.close();
await browser.close();
