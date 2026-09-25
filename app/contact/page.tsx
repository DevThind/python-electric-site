import type { Metadata } from 'next';
import { QuoteForm } from '@/components/quote-form';
import { services, site } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata(
  'Contact & Request a Quote',
  'Tell Python Electric about your electrical project in Vancouver, BC. Share a few details to begin a quote enquiry.',
  '/contact',
);

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const requestedService = (await searchParams).service || '';
  const initialService = services.some(service => service.slug === requestedService) ? requestedService : '';

  return <>
    <section className="page-hero shell contact-hero">
      <span className="eyebrow">Contact / Python Electric</span>
      <div className="page-hero-grid"><h1>Request an <em>electrical quote.</em></h1><p>Tell us about the property, the electrical work you have in mind, and the best way to reach you. A brief description is enough to begin.</p></div>
    </section>
    <section className="contact-section shell">
      <div className="contact-aside">
        <span className="eyebrow">What helps us understand the work</span>
        <h2>A little context goes a long way.</h2>
        <p>Include the property type and location, what needs to change, and any timing or plans you already have. You can use the form for a repair, installation, renovation, lighting, upgrade, EV charger, restoration enquiry, or another electrical question.</p>
        <div className="contact-detail"><span className="eyebrow">Based in</span><strong>{site.location}</strong><p>Share your city or area so the enquiry can be considered in context.</p></div>
      </div>
      <QuoteForm initialService={initialService} />
    </section>
  </>;
}
