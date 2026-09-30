import { chromium } from 'playwright';
import { resolve } from 'node:path';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const baseURL = process.env.TYPOGRAPHY_BASE_URL || 'http://127.0.0.1:3000';
for (const width of [1920, 1440, 1024, 768, 390, 360, 320]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const externalFonts = [];
  page.on('request', request => { if (/fonts\.(googleapis|gstatic)\.com|(?:api|cdn)\.fontshare\.com/.test(request.url())) externalFonts.push(request.url()); });
  const response = await page.goto(baseURL);
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
  const { nodeId: paragraphNode } = await client.send('DOM.querySelector', { nodeId: root.nodeId, selector: '.home-hero p' });
  const { fonts: paragraphFonts } = await client.send('CSS.getPlatformFontsForNode', { nodeId: paragraphNode });
  console.log(width, info, fonts, paragraphFonts);
  if (response.status() !== 200 || info.overflow || info.weight !== '700' || info.eyebrowWeight !== '600' || Math.abs(info.lineHeightRatio - 1.08) > .01 || info.thin.length || externalFonts.length || !fonts.some(font => font.isCustomFont && font.familyName.includes('Manrope')) || !paragraphFonts.some(font => font.isCustomFont && font.familyName.includes('DM Sans'))) throw Error('Typography check failed');
  if (width === 1440 || width === 390) await page.screenshot({ path: resolve(`notes/ui-redesign/after-manrope-top-${width}.png`) });
  await page.close();
}
for (const route of ['/services', '/services/residential-electrical', '/services/commercial-electrical', '/services/emergency-electrical', '/services/electrical-restoration', '/work', '/about', '/contact', '/privacy']) {
  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const response = await page.goto(baseURL + route);
    await page.evaluate(() => document.fonts.ready);
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      clippedHeadings: [...document.querySelectorAll('h1,h2,h3')].filter(el => el.scrollWidth > el.clientWidth + 1).map(el => el.textContent),
    }));
    console.log(route, width, state);
    if (response.status() !== 200 || state.overflow || state.clippedHeadings.length) throw Error(`Typography layout failed: ${route} at ${width}px`);
    if (width !== 320 && ['/services', '/contact'].includes(route)) await page.screenshot({ path: resolve(`notes/ui-redesign/after-manrope-${route.slice(1)}-${width}.png`) });
    await page.close();
  }
}
await browser.close();
console.log('Manrope headings, DM Sans body, local font loading, and responsive typography checks passed');
