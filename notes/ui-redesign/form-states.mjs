import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto((process.env.SITE_URL || 'http://localhost:3100') + '/contact?service=residential-electrical');
await page.locator('[name=name]').fill('Test Client');
await page.locator('[name=phone]').fill('604 555 0100');
await page.locator('[name=area]').fill('Vancouver');
await page.locator('[name=message]').fill('I would like to discuss lighting at home.');
await page.route('**/api/quote', async route => {
  await new Promise(resolve => setTimeout(resolve, 500));
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ accepted: true, mode: 'test' }) });
});
await page.getByRole('button', { name: 'Send enquiry' }).click();
await page.getByRole('button', { name: /Sending/ }).waitFor();
if (!await page.getByRole('button', { name: /Sending/ }).isDisabled()) throw Error('Pending button was not disabled');
await page.getByText('Test request accepted.').waitFor();
await page.getByText('No email was sent.').waitFor();
await page.getByRole('button', { name: /Send another enquiry/ }).click();
if (await page.locator('[name=name]').inputValue() !== '') throw Error('Second enquiry did not reset fields');
console.log('Phone-only submission, pending, local test success, and reset passed');
await page.unroute('**/api/quote');
await page.locator('[name=name]').fill('Test Client');
await page.locator('[name=phone]').fill('-------');
await page.locator('[name=area]').fill('Vancouver');
await page.locator('[name=service]').selectOption('residential-electrical');
await page.locator('[name=message]').fill('I would like to discuss lighting at home.');
await page.getByRole('button', { name: 'Send enquiry' }).click();
await page.getByText('Enter a valid phone number.').waitFor();
await page.locator('[name=phone]').fill('604 555 0100');
for (const payload of [{}, { accepted: false, mode: 'real' }, { accepted: true, mode: 'unknown' }]) {
  await page.route('**/api/quote', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(payload) }));
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await page.getByText('We could not confirm your request was sent. Please try again.', { exact: false }).waitFor();
  if (await page.locator('[name=message]').inputValue() !== 'I would like to discuss lighting at home.') throw Error('Malformed acknowledgement lost form values');
  await page.unroute('**/api/quote');
}
await page.route('**/api/quote', route => route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ errors: { name: 'Server validation rejected the name.' } }) }));
await page.getByRole('button', { name: 'Send enquiry' }).click();
await page.getByText('Server validation rejected the name.').waitFor();
if (!await page.locator('[name=name]').evaluate(el => el === document.activeElement && el.getAttribute('aria-invalid') === 'true')) throw Error('Server validation did not focus and mark the invalid field');
await page.locator('[name=name]').fill('Corrected Client');
await page.unroute('**/api/quote');
await page.route('**/api/quote', route => route.abort('failed'));
await page.getByRole('button', { name: 'Send enquiry' }).click();
await page.getByText('Your request could not be sent. Check your connection and try again.', { exact: false }).waitFor();
if (await page.locator('[name=message]').inputValue() !== 'I would like to discuss lighting at home.') throw Error('Network failure lost form values');
console.log('Phone validation, malformed acknowledgements, server validation focus, and network failure preservation passed');
await browser.close();
