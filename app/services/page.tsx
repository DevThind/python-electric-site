import type { Metadata } from 'next';
import Link from 'next/link';
import { ClosingCta, Photo } from '@/components/ui';
import { ServiceAreas } from '@/components/service-areas';
import { ServiceTile } from '@/components/service-tile';
import { photoById, services } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata(
  'Electrical Services in Vancouver, BC',
  'Explore residential electrical, commercial electrical, 24-hour emergency electrical services, and electrical restoration with Python Electric.',
  '/services',
);

export default function ServicesPage() {
  return <>
    <section className="page-hero shell">
      <span className="eyebrow">Services / Python Electric</span>
      <div className="page-hero-grid"><h1>Electrical work for <em>what comes next.</em></h1><p>A repair, a renovation, an urgent electrical issue, or recovery after damage: choose the service closest to your project and see what details help us get started.</p></div>
    </section>
    <section className="services-page-section shell">
      <div className="services-page-grid">{services.map(service => <ServiceTile service={service} headingLevel={2} key={service.slug} />)}</div>
      <p className="services-choice-note">Does your project cross more than one category? Choose the closest fit and tell us about the full scope in your enquiry.</p>
    </section>
    <section className="services-note"><div className="shell services-note-grid">
      <div><span className="eyebrow">Work on site</span><h2>See installed electrical work.</h2><p>Our gallery shows finished lighting installations. For repairs, wiring, panels, or other electrical work, tell us what your property needs and we can start with the details.</p><Link href="/work" className="button button-outline">View the gallery <span aria-hidden="true">↗</span></Link></div>
      <Photo photo={photoById('1033')} sizes="(max-width: 800px) 100vw, 45vw" />
    </div></section>
    <ServiceAreas />
    <ClosingCta />
  </>;
}
