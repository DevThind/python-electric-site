import { chromium } from 'playwright';
import { resolve } from 'node:path';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
for (const width of [1440, 1024, 768, 390, 360]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const externalFonts = [];
  page.on('request', request => { if (/fonts\.(googleapis|gstatic)\.com/.test(request.url())) externalFonts.push(request.url()); });
  const response = await page.goto('http://127.0.0.1:3100/');
  await page.evaluate(() => document.fonts.ready);
  const info = await page.evaluate(() => {
    const heading = document.querySelector('.home-hero h1');
    const style = getComputedStyle(heading);
    const eyebrow = getComputedStyle(document.querySelector('.hero-eyebrow'));
    const body = getComputedStyle(document.body);
    const thin = [...document.querySelectorAll('.home-hero *, .site-header *')].filter(el => [...el.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()) && Number(getComputedStyle(el).fontWeight) < 400).map(el => el.textContent);
    return { fontFamily: body.fontFamily, weight: style.fontWeight, tracking: style.letterSpacing, lineHeightRatio: Number.parseFloat(style.lineHeight) / Number.parseFloat(style.fontSize), eyebrowWeight: eyebrow.fontWeight, overflow: document.documentElement.scrollWidth > innerWidth, thin };
  });
  const client = await page.context().newCDPSession(page);
  await client.send('DOM.enable');
  await client.send('CSS.enable');
  const { root } = await client.send('DOM.getDocument');
  const { nodeId } = await client.send('DOM.querySelector', { nodeId: root.nodeId, selector: '.home-hero h1' });
  const { fonts } = await client.send('CSS.getPlatformFontsForNode', { nodeId });
  console.log(width, info, fonts);
  if (response.status() !== 200 || info.overflow || info.weight !== '800' || info.eyebrowWeight !== '600' || Math.abs(info.lineHeightRatio - 1.08) > .01 || info.thin.length || externalFonts.length || !fonts.some(font => font.isCustomFont && font.familyName.includes('Inter'))) throw Error('Typography check failed');
  if (width === 1440 || width === 390) await page.screenshot({ path: resolve(`notes/ui-redesign/after-inter-top-${width}.png`) });
  await page.close();
}
await browser.close();
console.log('Inter font, weights, line height, fallback stack, and responsive checks passed');
