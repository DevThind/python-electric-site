import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const baselineFont = (await readFile('app/fonts/dm-sans-latin.woff2')).toString('base64');
for (const base of ['http://localhost:3000', 'http://127.0.0.1:3100']) {
  for (const [route, label] of [['/', 'home'], ['/services', 'services'], ['/contact', 'contact']]) {
    const page = await browser.newPage({ viewport: { width: 1260, height: 700 }, deviceScaleFactor: 1.5, reducedMotion: 'reduce' });
    const errors = [];
    const assets = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400 && /\.(css|js|woff2)(\?|$)/.test(response.url())) assets.push({ url: response.url(), status: response.status() }); });
    try {
      const response = await page.goto(base + route, { timeout: 15000 });
      await page.evaluate(() => document.fonts.ready);
      const measure = () => page.evaluate(() => {
        const rect = selector => { const el = document.querySelector(selector); if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), width: Math.round(r.width), height: Math.round(r.height) }; };
        return { font: getComputedStyle(document.body).fontFamily, bodySize: getComputedStyle(document.body).fontSize, h1Size: getComputedStyle(document.querySelector('h1')).fontSize, docWidth: document.documentElement.scrollWidth, docHeight: document.documentElement.scrollHeight, shell: rect('.shell'), header: rect('.site-header'), hero: rect('.home-hero'), serviceCard: rect('.home-service-card'), form: rect('.quote-form') };
      });
      const current = await measure();
      await page.screenshot({ path: resolve(`notes/ui-redesign/global-${label}-${base.includes('3000') ? '3000' : '3100'}.png`), fullPage: true });
      await page.evaluate(async encoded => { const font = new FontFace('BaselineDMSans', `url(data:font/woff2;base64,${encoded})`, { weight: '100 1000' }); document.fonts.add(await font.load()); }, baselineFont);
      await page.addStyleTag({ content: ':root{--body:BaselineDMSans,Arial,sans-serif} h1,h2,h3{font-weight:720}.eyebrow{font-weight:750;letter-spacing:.095em}.button,.text-link,.arrow-link{font-weight:720}.desktop-nav{font-weight:650}.home-hero h1{font-weight:680;letter-spacing:-.04em;line-height:1.12}' });
      const beforeInter = await measure();
      console.log(JSON.stringify({ base, route, status: response.status(), current, beforeInter, errors, failedAssets: assets }));
    } catch (error) { console.log(JSON.stringify({ base, route, error: error.message })); }
    await page.close();
  }
}
await browser.close();
