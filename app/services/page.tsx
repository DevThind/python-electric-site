import type { Metadata } from 'next';
import Link from 'next/link';
import { ClosingCta, Photo } from '@/components/ui';
import { photoById, services } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata(
  'Electrical Services in Vancouver, BC',
  'Explore residential electrical, commercial electrical, EV charger installation, and electrical restoration with Python Electric.',
  '/services',
);

export default function ServicesPage() {
  return <>
    <section className="page-hero shell">
      <span className="eyebrow">Services / Python Electric</span>
      <div className="page-hero-grid"><h1>Electrical services for <em>homes and businesses.</em></h1><p>From repairs and circuits to new installations, find the closest fit for the work you need. Each service page outlines useful details to share.</p></div>
    </section>
    <section className="services-page-section shell">
      <div className="services-page-grid">{services.map((service, index) => <Link className="service-card" href={'/services/' + service.slug} key={service.slug}>
        <span className="service-card-top"><span>{String(index + 1).padStart(2, '0')} / 04</span><span aria-hidden="true">↗</span></span>
        <div><h2>{service.title}</h2><p>{service.short}</p></div>
        <span className="service-card-bottom">Explore service <span aria-hidden="true">↗</span></span>
      </Link>)}</div>
    </section>
    <section className="services-note"><div className="shell services-note-grid">
      <div><span className="eyebrow">Work on site</span><h2>See installed electrical work.</h2><p>Our gallery shows finished lighting installations. For repairs, wiring, panels, or other electrical work, tell us what your property needs and we can start with the details.</p><Link href="/work" className="button button-outline">View the gallery <span aria-hidden="true">↗</span></Link></div>
      <Photo photo={photoById('1033')} sizes="(max-width: 800px) 100vw, 45vw" />
    </div></section>
    <ClosingCta />
  </>;
}
