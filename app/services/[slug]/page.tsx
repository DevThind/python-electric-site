import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ClosingCta } from '@/components/ui';
import { quoteHref, serviceBySlug, services } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return services.map(service => ({ slug: service.slug }));
}

const relatedBySlug: Record<string, string[]> = {
  'residential-electrical': ['lighting', 'panels-circuits-upgrades', 'repairs-maintenance'],
  'commercial-electrical': ['construction-rewiring', 'repairs-maintenance', 'lighting'],
  'construction-rewiring': ['residential-electrical', 'commercial-electrical', 'panels-circuits-upgrades'],
  'panels-circuits-upgrades': ['ev-chargers', 'residential-electrical', 'construction-rewiring'],
  lighting: ['residential-electrical', 'commercial-electrical', 'construction-rewiring'],
  'repairs-maintenance': ['residential-electrical', 'commercial-electrical', 'panels-circuits-upgrades'],
  'ev-chargers': ['panels-circuits-upgrades', 'residential-electrical', 'commercial-electrical'],
  'electrical-restoration': ['repairs-maintenance', 'residential-electrical', 'commercial-electrical'],
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return pageMetadata(
    service.title + ' in Vancouver, BC',
    service.short + ' Talk with Python Electric about ' + service.title.toLowerCase() + ' in Vancouver, BC.',
    '/services/' + slug,
    service.image,
  );
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  const related = (relatedBySlug[slug] || []).map(relatedSlug => serviceBySlug(relatedSlug)!);

  return <>
    <section className={'detail-hero ' + (service.image ? 'detail-hero-image' : '')}>
      <div className="shell detail-hero-grid">
        <div>
          <Link href="/services" className="eyebrow crumb">← All services</Link>
          <span className="detail-kicker">Electrical services / Vancouver, BC</span>
          <h1>{service.title}<span className="period">.</span></h1>
          <p>{service.intro}</p>
          <Link className="button button-amber" href={quoteHref(service.slug)}>Discuss this service <span aria-hidden="true">↗</span></Link>
        </div>
        {service.image && <div className="detail-photo"><Image src={service.image} alt={service.imageAlt || ''} fill priority sizes="(max-width: 800px) 100vw, 45vw" /></div>}
      </div>
    </section>

    <section className="section shell detail-content">
      <div className="detail-main">
        <div><span className="eyebrow">The possibilities</span><h2>What this work can include.</h2><p>Every property has its own conditions. These examples can help you find the right starting point for your enquiry.</p></div>
        <div className="detail-examples">{service.examples.map((example, index) => <div key={example}><span>{String(index + 1).padStart(2, '0')}</span><strong>{example}</strong></div>)}</div>
        <div className="detail-factors"><span className="eyebrow">What shapes the scope</span><h3>Details worth considering.</h3><ul>{service.factors.map(factor => <li key={factor}>{factor}</li>)}</ul></div>
      </div>
      <div className="detail-guidance"><span className="eyebrow">Before you reach out</span><h3>What helps us understand the work</h3><p>{service.guidance}</p><Link href={quoteHref(service.slug)} className="text-link">Start your enquiry <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="detail-next"><div className="shell detail-next-inner"><div><span className="eyebrow">A useful first step</span><h2>Start with what you know.</h2><p>A short description is enough to begin. Depending on the property and work involved, a closer assessment may be needed before the scope can be confirmed.</p></div><Link className="button button-dark" href={quoteHref(service.slug)}>Ask about {service.title.toLowerCase()} <span aria-hidden="true">↗</span></Link></div></section>
    <section className="related shell"><span className="eyebrow">Also explore</span><div>{related.map(item => <Link href={'/services/' + item.slug} key={item.slug}>{item.title}<span aria-hidden="true">↗</span></Link>)}</div></section>
    <ClosingCta title="Let's talk about the work." text={'Tell us about your ' + service.title.toLowerCase() + ' enquiry and the property involved.'} />
  </>;
}
