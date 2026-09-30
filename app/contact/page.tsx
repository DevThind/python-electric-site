import type { Metadata } from 'next';
import { QuoteForm } from '@/components/quote-form';
import { services, site } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata('Contact & Request a Quote', 'Tell Python Electric about your electrical project in Vancouver, BC. Share a few details to begin a quote enquiry.', '/contact');

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const requestedService = (await searchParams).service || '';
  const initialService = services.some(service => service.slug === requestedService) ? requestedService : '';
  return <>
    <section className="page-hero shell contact-hero"><span className="eyebrow">Contact / Python Electric</span><div className="page-hero-grid"><h1>Request a quote.</h1><p>Tell us what needs attention and where the property is. A short description is enough to get started.</p></div></section>
    <section className="contact-section shell"><div className="contact-emergency"><div><span className="eyebrow">24-hour emergency electrical service</span><p>Call us directly for urgent electrical help, day or night.</p></div><div className="contact-emergency-actions">{site.emergencyPhones.map(phone => <a className="button button-primary" href={phone.href} key={phone.href}>Call {phone.display} <span aria-hidden="true">↗</span></a>)}</div></div><QuoteForm initialService={initialService} /><aside className="contact-aside"><span className="eyebrow">Good to know</span><h2>Start with what you know.</h2><p>Describe the repair, installation, renovation, or other electrical work. Photos, plans, and equipment details can be shared during follow-up; this form does not accept attachments.</p><div className="contact-detail"><span className="eyebrow">Email us</span><a className="text-link email-link" href={'mailto:' + site.email}>{site.email}</a><p>You can email your project details, photos, or plans directly.</p></div><div className="contact-detail"><span className="eyebrow">Serving locations</span><ul className="contact-service-areas">{site.serviceAreas.map(area => <li key={area}>{area}</li>)}</ul></div><div className="contact-detail"><span className="eyebrow">Based in</span><strong>{site.location}</strong><p>Include your city or area in the form.</p></div></aside></section>
  </>;
}
