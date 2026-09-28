import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:3100/contact?service=residential-electrical');
await page.locator('[name=name]').fill('Test Client');
await page.locator('[name=phone]').fill('604 555 0100');
await page.locator('[name=area]').fill('Vancouver');
await page.locator('[name=message]').fill('I would like to discuss lighting at home.');
await page.route('**/api/quote', async route => {
  await new Promise(resolve => setTimeout(resolve, 500));
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ mode: 'test' }) });
});
await page.getByRole('button', { name: 'Send enquiry' }).click();
await page.getByRole('button', { name: /Sending/ }).waitFor();
if (!await page.getByRole('button', { name: /Sending/ }).isDisabled()) throw Error('Pending button was not disabled');
await page.getByText('Test request accepted.').waitFor();
await page.getByText('No email was sent.').waitFor();
await page.getByRole('button', { name: /Send another enquiry/ }).click();
if (await page.locator('[name=name]').inputValue() !== '') throw Error('Second enquiry did not reset fields');
console.log('Phone-only submission, pending, local test success, and reset passed');
await browser.close();
