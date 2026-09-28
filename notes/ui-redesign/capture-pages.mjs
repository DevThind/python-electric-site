import { chromium } from 'playwright';
import { resolve } from 'node:path';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
for (const [route, label] of [['/services', 'services'], ['/services/ev-chargers', 'ev-detail'], ['/work', 'work'], ['/about', 'about']]) {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await page.goto('http://localhost:3100' + route, { waitUntil: 'load' });
    await page.screenshot({ path: resolve(`notes/ui-redesign/after-${label}-top-${width}.png`) });
    await page.close();
  }
}
await browser.close();
