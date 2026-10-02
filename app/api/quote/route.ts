import { NextResponse } from 'next/server';
import { services, site } from '@/lib/content';

export const runtime = 'nodejs';
type Payload = { name?: unknown; email?: unknown; phone?: unknown; service?: unknown; area?: unknown; message?: unknown; website?: unknown };
const clean = (value: unknown) => typeof value === 'string' ? value.trim() : '';
function validate(input: Payload) {
  const values = { name: clean(input.name), email: clean(input.email), phone: clean(input.phone), service: clean(input.service), area: clean(input.area), message: clean(input.message), website: clean(input.website) };
  const errors: Record<string, string> = {};
  if (values.name.length < 2 || values.name.length > 100) errors.name = 'Enter a name between 2 and 100 characters.';
  if (!values.email && !values.phone) errors.email = 'Add an email address or phone number.';
  if (values.email && (values.email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))) errors.email = 'Enter a valid email address.';
  if (values.phone && (!/^[+()\d\s.-]{7,30}$/.test(values.phone) || values.phone.replace(/\D/g, '').length < 7)) errors.phone = 'Enter a valid phone number.';
  if (!services.some(s => s.slug === values.service) && values.service !== 'not-sure') errors.service = 'Choose a service.';
  if (values.area.length < 2 || values.area.length > 100) errors.area = 'Enter a city or area between 2 and 100 characters.';
  if (values.message.length < 10 || values.message.length > 3000) errors.message = 'Describe the project in 10 to 3000 characters.';
  if (values.website) errors.form = 'This request could not be accepted.';
  return { values, errors };
}

export async function POST(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      // Bound memory before decoding; the existing 8,000-character limit follows.
      if (bytes > 32000) {
        await reader.cancel();
        return NextResponse.json({ error: 'This request is too long.' }, { status: 413 });
      }
      chunks.push(value);
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  } finally {
    reader.releaseLock();
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (raw.length > 8000) return NextResponse.json({ error: 'This request is too long.' }, { status: 413 });
  let payload: Payload;
  try { payload = JSON.parse(raw); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  const { values, errors } = validate(payload);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 });
  if (process.env.NODE_ENV === 'development' && process.env.QUOTE_TEST_MODE === '1') return NextResponse.json({ accepted: true, mode: 'test' });
  const to = process.env.QUOTE_TO_EMAIL || site.email, from = process.env.QUOTE_FROM_EMAIL, apiKey = process.env.RESEND_API_KEY;
  if (!to || !from || !apiKey) return NextResponse.json({ error: 'Enquiry delivery is not configured yet. Please try again later.' }, { status: 503 });
  try {
    const service = services.find(s => s.slug === values.service)?.title || 'Not sure yet';
    const text = [`Name: ${values.name}`, `Email: ${values.email || 'Not supplied'}`, `Phone: ${values.phone || 'Not supplied'}`, `Service: ${service}`, `City or area: ${values.area}`, '', 'Project:', values.message].join('\n');
    const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to: [to], subject: `Python Electric enquiry: ${service}`, text, ...(values.email ? { reply_to: values.email } : {}) }), cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (!response.ok) { console.error('Quote delivery rejected', response.status); return NextResponse.json({ error: 'Your request could not be sent. Please try again later.' }, { status: 502 }); }
    return NextResponse.json({ accepted: true, mode: 'real' });
  } catch (error) { console.error('Quote delivery failed', error); return NextResponse.json({ error: 'Your request could not be sent. Please try again later.' }, { status: 502 }); }
}
