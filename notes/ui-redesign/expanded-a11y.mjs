import { chromium } from 'playwright';
import { resolve } from 'node:path';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:3100/work');
await page.getByRole('button', { name: 'View larger image: Pendant and stair lighting' }).click();
await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
const violations = await page.evaluate(async () => (await window.axe.run()).violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })));
console.log('gallery dialog axe', violations);
await browser.close();
if (violations.length) process.exitCode = 1;
