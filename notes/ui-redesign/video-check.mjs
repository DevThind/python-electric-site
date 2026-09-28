import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:3100/');
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
const metadata = await page.locator('video').evaluate(video => ({ duration: video.duration, width: video.videoWidth, height: video.videoHeight, muted: video.muted, loop: video.loop, source: video.currentSrc }));
assert(Math.abs(metadata.duration - 15.166667) < .1);
assert.equal(metadata.width, 1280);
assert.equal(metadata.height, 720);
assert(metadata.muted && metadata.loop);
await page.getByRole('button', { name: 'Pause background video' }).click();
await page.getByRole('button', { name: 'Play background video' }).waitFor();

for (const [time, scene] of [[1, 'opening'], [4.75, 'opening-transition'], [5.1, 'charger'], [10.5, 'stairs'], [14.9, 'loop']]) {
  await page.locator('video').evaluate((video, time) => new Promise(resolve => { video.addEventListener('seeked', resolve, { once: true }); video.currentTime = time; }), time);
  await page.screenshot({ path: `notes/ui-redesign/after-video-${scene}-1440.png` });
  if (scene === 'opening') {
    const before = await page.addStyleTag({ content: '.home-hero-video { filter: none; } .home-hero-shade { background: linear-gradient(180deg, #071728b8 0%, transparent 28%), linear-gradient(90deg, #071728b8, #0717289e), linear-gradient(0deg, #07172870, transparent 40%); }' });
    await page.screenshot({ path: 'notes/ui-redesign/before-video-brightness-1440.png' });
    await before.evaluate(element => element.remove());
  }
}
await page.evaluate(() => scrollTo(0, document.querySelector('.home-hero').offsetHeight + 200));
await page.evaluate(() => scrollTo(0, 0));
assert(await page.locator('video').evaluate(video => video.paused));
await page.getByRole('button', { name: 'Play background video' }).click();
await page.waitForFunction(() => !document.querySelector('video').paused);
await page.locator('video').evaluate(video => { video.currentTime = video.duration - .15; });
await page.waitForFunction(() => { const video = document.querySelector('video'); return !video.paused && video.currentTime < 1; });
await page.evaluate(() => scrollTo(0, document.querySelector('.home-hero').offsetHeight + 200));
await page.waitForFunction(() => document.querySelector('video').paused);
console.log('Decoded media, three scenes, loop playback, controls, manual pause retention, and offscreen pause passed', metadata);
await page.close();

for (const [label, options, saveData] of [
  ['mobile', { viewport: { width: 390, height: 844 } }, false],
  ['reduced-motion', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }, false],
  ['save-data', { viewport: { width: 1440, height: 900 } }, true],
]) {
  const fallback = await browser.newPage(options);
  const requests = [];
  fallback.on('request', request => { if (request.url().includes('.mp4')) requests.push(request.url()); });
  if (saveData) await fallback.addInitScript(() => Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: true } }));
  await fallback.goto('http://127.0.0.1:3100/');
  await fallback.evaluate(() => document.fonts.ready);
  assert.equal(await fallback.locator('video').count(), 0);
  assert.equal(requests.length, 0);
  const response = await fallback.request.get('http://127.0.0.1:3100/images/python-electric-hero-poster.jpg?v=20260928');
  assert.equal(response.status(), 200);
  assert(await fallback.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  if (label === 'mobile') await fallback.screenshot({ path: 'notes/ui-redesign/after-video-poster-390.png' });
  console.log(label, 'uses poster without video requests');
  await fallback.close();
}
await browser.close();
