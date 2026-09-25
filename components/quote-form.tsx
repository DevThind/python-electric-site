'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { services } from '@/lib/content';

type Values = { name: string; email: string; phone: string; service: string; area: string; message: string; website: string };
type Errors = Partial<Record<keyof Values | 'form', string>>;

const empty: Values = { name: '', email: '', phone: '', service: '', area: '', message: '', website: '' };

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = 'Enter your name.';
  if (!values.email.trim() && !values.phone.trim()) errors.email = 'Add an email address or phone number.';
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (values.phone.trim() && !/^[+()\d\s.-]{7,30}$/.test(values.phone.trim())) errors.phone = 'Enter a valid phone number.';
  if (!values.service) errors.service = 'Choose a service or “Not sure yet”.';
  if (values.area.trim().length < 2) errors.area = 'Enter your city or area.';
  if (values.message.trim().length < 10) errors.message = 'Describe the project in at least 10 characters.';
  return errors;
}

export function QuoteForm({ initialService = '' }: { initialService?: string }) {
  const [values, setValues] = useState<Values>({ ...empty, service: initialService });
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [accepted, setAccepted] = useState<'real' | 'test' | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function update(key: keyof Values, value: string) {
    setValues(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined, form: undefined }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setPending(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
          const key = Object.keys(result.errors)[0];
          formRef.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
        } else {
          setErrors({ form: result.error || 'Your request could not be sent. Please try again.' });
        }
        return;
      }
      setAccepted(result.mode === 'test' ? 'test' : 'real');
    } catch {
      setErrors({ form: 'Your request could not be sent. Check your connection and try again.' });
    } finally {
      setPending(false);
    }
  }

  if (accepted) {
    return <div className="form-success" role="status">
      <span className="success-mark" aria-hidden="true">✓</span>
      <h2>{accepted === 'test' ? 'Test request accepted.' : 'Your request has been received.'}</h2>
      <p>{accepted === 'test' ? 'This is a local form test. No email was sent.' : 'Thank you for the details. Python Electric has received your enquiry.'}</p>
      <button className="text-link" type="button" onClick={() => { setAccepted(null); setValues(empty); setErrors({}); }}>Send another enquiry ↗</button>
    </div>;
  }

  return <form className="quote-form" ref={formRef} onSubmit={submit} noValidate>
    <div className="form-top"><span className="eyebrow">Request a quote</span><span>Fields marked * are required</span></div>
    <p className="form-contact-hint" id="contact-method-hint">Provide an email address or phone number so we can reply.</p>
    <div className="form-row">
      <Field label="Your name" name="name" required error={errors.name}>
        <input id="name" name="name" required maxLength={100} autoComplete="name" value={values.name} onChange={e => update('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
      </Field>
      <Field label="Email address" name="email" error={errors.email}>
        <input id="email" name="email" type="email" maxLength={200} autoComplete="email" value={values.email} onChange={e => update('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={`contact-method-hint${errors.email ? ' email-error' : ''}`} />
      </Field>
    </div>
    <div className="form-row">
      <Field label="Phone number" name="phone" error={errors.phone}>
        <input id="phone" name="phone" type="tel" maxLength={30} autoComplete="tel" value={values.phone} onChange={e => update('phone', e.target.value)} aria-invalid={!!errors.phone} aria-describedby={`contact-method-hint${errors.phone ? ' phone-error' : ''}`} />
      </Field>
      <Field label="Service" name="service" required error={errors.service}>
        <select id="service" name="service" required value={values.service} onChange={e => update('service', e.target.value)} aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined}>
          <option value="">Select a service</option>
          {services.map(service => <option key={service.slug} value={service.slug}>{service.title}</option>)}
          <option value="not-sure">Not sure yet</option>
        </select>
      </Field>
    </div>
    <Field label="City or area" name="area" required error={errors.area}>
      <input id="area" name="area" required maxLength={100} autoComplete="address-level2" value={values.area} onChange={e => update('area', e.target.value)} aria-invalid={!!errors.area} aria-describedby={errors.area ? 'area-error' : undefined} placeholder="e.g. Vancouver" />
    </Field>
    <Field label="Tell us about the work" name="message" required error={errors.message}>
      <textarea id="message" name="message" required maxLength={3000} rows={5} value={values.message} onChange={e => update('message', e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="What needs to be installed, repaired, or changed?" />
    </Field>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={e => update('website', e.target.value)} /></div>
    {errors.form && <p className="form-error-banner" role="alert">{errors.form}</p>}
    <div className="form-submit"><p>We use these details only to handle your enquiry. See our <a href="/privacy">privacy policy</a>.</p><button className="button button-amber" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Send Request'} <span aria-hidden="true">↗</span></button></div>
  </form>;
}

function Field({ label, name, required, error, children }: { label: string; name: string; required?: boolean; error?: string; children: ReactNode }) {
  return <div className="field"><label htmlFor={name}>{label}{required && <span aria-hidden="true"> *</span>}</label>{children}{error && <p className="field-error" id={`${name}-error`} role="alert">{error}</p>}</div>;
}
