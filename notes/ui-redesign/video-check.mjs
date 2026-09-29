import assert from 'node:assert/strict';
import { chromium, devices } from 'playwright';

const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(baseUrl + '/');
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

for (const device of ['iPhone 13', 'Pixel 7']) {
  const mobile = await browser.newPage({ ...devices[device], reducedMotion: 'no-preference' });
  const errors = [];
  mobile.on('pageerror', error => errors.push(error.message));
  await mobile.goto(baseUrl + '/');
  await mobile.waitForFunction(() => { const video = document.querySelector('video'); return video?.readyState >= 2 && !video.paused && video.currentTime > 0; });
  assert(await mobile.locator('video').evaluate(video => video.muted && video.playsInline && video.autoplay));
  const time = await mobile.locator('video').evaluate(video => video.currentTime);
  await mobile.waitForFunction(time => document.querySelector('video').currentTime > time + .25, time);
  const control = mobile.locator('.hero-video-control');
  const bounds = await control.boundingBox();
  const actions = await mobile.locator('.hero-actions').boundingBox();
  assert(bounds.height >= 44 && bounds.y >= actions.y + actions.height, 'Mobile control must be touch-sized and clear of the quote buttons');
  await mobile.getByRole('button', { name: 'Pause background video' }).click();
  await mobile.waitForFunction(() => document.querySelector('video').paused);
  for (const [time, scene] of [[1, 'opening'], [4, 'opening-late'], [5.5, 'charger'], [10.5, 'stairs'], [14.9, 'loop']]) {
    await mobile.locator('video').evaluate((video, time) => new Promise(resolve => { video.addEventListener('seeked', resolve, { once: true }); video.currentTime = time; }), time);
    const opening = scene.startsWith('opening') || scene === 'loop';
    await mobile.waitForFunction(opening => document.querySelector('video').dataset.scene === (opening ? 'opening' : 'detail'), opening);
    const framing = await mobile.locator('video').evaluate(video => {
      const bounds = video.getBoundingClientRect();
      const position = getComputedStyle(video).objectPosition;
      const scale = Math.max(bounds.width / video.videoWidth, bounds.height / video.videoHeight);
      const left = (video.videoWidth * scale - bounds.width) * Number.parseFloat(position) / 100 / scale;
      return { left, right: left + bounds.width / scale, sourceWidth: video.videoWidth, position, posterPosition: getComputedStyle(video.closest('.home-hero')).backgroundPosition };
    });
    if (opening) {
      assert(framing.left < framing.sourceWidth * .21 && framing.right > framing.sourceWidth * .4, 'Both electricians must remain in the mobile opening crop');
      assert.equal(framing.position, framing.posterPosition, 'Opening and poster must use the same crop');
    } else assert.equal(framing.position, '50% 50%', 'Charger and lighting scenes must retain their centered crop');
    await mobile.screenshot({ path: `notes/ui-redesign/after-video-${scene}-${device.toLowerCase().replaceAll(' ', '-')}.png` });
  }
  console.log(device, 'opening keeps both electricians in frame; poster matches; later scenes remain centered');
  await mobile.evaluate(() => scrollTo(0, document.querySelector('.home-hero').offsetHeight + 200));
  await mobile.evaluate(() => scrollTo(0, 0));
  assert(await mobile.locator('video').evaluate(video => video.paused));
  await mobile.getByRole('button', { name: 'Play background video' }).click();
  await mobile.waitForFunction(() => !document.querySelector('video').paused);
  await mobile.evaluate(() => scrollTo(0, document.querySelector('.home-hero').offsetHeight + 200));
  await mobile.waitForFunction(() => document.querySelector('video').paused);
  assert(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  assert.deepEqual(errors, []);
  console.log(device, 'decoded and played inline; pause, resume, and offscreen pause passed');
  await mobile.close();
}

const blocked = await browser.newPage({ ...devices['iPhone 13'], reducedMotion: 'no-preference' });
const blockedErrors = [];
blocked.on('pageerror', error => blockedErrors.push(error.message));
await blocked.addInitScript(() => {
  const play = HTMLMediaElement.prototype.play;
  let allowPlayback = false;
  document.addEventListener('click', () => { allowPlayback = true; }, true);
  HTMLMediaElement.prototype.play = function () {
    if (!allowPlayback) return Promise.reject(new DOMException('Autoplay blocked', 'NotAllowedError'));
    return play.call(this);
  };
  HTMLMediaElement.prototype.setAttribute = new Proxy(HTMLMediaElement.prototype.setAttribute, {
    apply(target, element, args) {
      if (args[0].toLowerCase() === 'autoplay') return;
      return Reflect.apply(target, element, args);
    },
  });
});
await blocked.goto(baseUrl + '/');
await blocked.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
assert(await blocked.locator('video').evaluate(video => video.paused));
await blocked.getByRole('button', { name: 'Play background video' }).click();
await blocked.waitForFunction(() => { const video = document.querySelector('video'); return !video.paused && video.currentTime > 0; });
assert.deepEqual(blockedErrors, []);
console.log('Mobile play button starts playback after simulated autoplay rejection');
await blocked.close();

for (const [label, options, saveData] of [
  ['reduced-motion', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }, false],
  ['save-data', { viewport: { width: 1440, height: 900 } }, true],
]) {
  const fallback = await browser.newPage(options);
  const requests = [];
  fallback.on('request', request => { if (request.url().includes('.mp4')) requests.push(request.url()); });
  if (saveData) await fallback.addInitScript(() => Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: true } }));
  await fallback.goto(baseUrl + '/');
  await fallback.evaluate(() => document.fonts.ready);
  assert.equal(await fallback.locator('video').count(), 0);
  assert.equal(requests.length, 0);
  const response = await fallback.request.get(baseUrl + '/images/python-electric-hero-poster.jpg?v=20260928');
  assert.equal(response.status(), 200);
  assert(await fallback.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  console.log(label, 'uses poster without video requests');
  await fallback.close();
}
await browser.close();
