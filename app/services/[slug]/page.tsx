import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { formerServiceDestinations, quoteHref, serviceBySlug, services } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return services.map(service => ({ slug: service.slug }));
}

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
  if (formerServiceDestinations[slug]) permanentRedirect(formerServiceDestinations[slug]);
  if (!service) notFound();
  const related = services.filter(item => item.slug !== slug);

  return <>
    <section className={'detail-hero ' + (service.image ? 'detail-hero-image' : '')}>
      <div className="shell detail-hero-grid">
        <div>
          <Link href="/services" className="eyebrow crumb">← All services</Link>
          <span className="detail-kicker">{service.label} / Vancouver, BC</span>
          <h1>{service.title}<span className="period">.</span></h1>
          <p>{service.intro}</p>
          <Link className="button button-amber" href={quoteHref(service.slug)}>Discuss this service <span aria-hidden="true">↗</span></Link>
        </div>
        {service.image && <div className="detail-photo"><Image src={service.image} alt={service.imageAlt || ''} fill priority sizes="(max-width: 800px) 100vw, 45vw" /></div>}
      </div>
    </section>

    <section className="section shell detail-content">
      <div className="detail-main">
        <div><span className="eyebrow">Where we can start</span><h2>{service.focusTitle}</h2><p>{service.focusIntro}</p></div>
        <div className="detail-examples">{service.areas.map((area, index) => <div key={area.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{area.title}</h3><p>{area.description}</p></div></div>)}</div>
        <div className="detail-factors"><span className="eyebrow">What shapes the scope</span><h3>Details that matter.</h3><ul>{service.factors.map(factor => <li key={factor}>{factor}</li>)}</ul></div>
      </div>
      <div className="detail-guidance"><span className="eyebrow">Before you reach out</span><h3>What helps us understand the work</h3><p>{service.guidance}</p><Link href={quoteHref(service.slug)} className="text-link">Start your enquiry <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="service-faq section shell"><div className="service-faq-intro"><span className="eyebrow">Good to know</span><h2>Common questions.</h2><p>Every property is different. These answers can help you prepare a useful first enquiry.</p></div><div className="faq-list">{service.questions.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>
    <section className="detail-next"><div className="shell detail-next-inner"><div><span className="eyebrow">A useful first step</span><h2>{service.nextTitle}</h2><p>{service.nextText}</p></div><Link className="button button-dark" href={quoteHref(service.slug)}>Ask about {service.title.toLowerCase()} <span aria-hidden="true">↗</span></Link></div></section>
    <section className="related shell"><span className="eyebrow">Also explore</span><div>{related.map(item => <Link href={'/services/' + item.slug} key={item.slug}>{item.title}<span aria-hidden="true">↗</span></Link>)}</div></section>
  </>;
}
