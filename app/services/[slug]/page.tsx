import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { Gallery } from '@/components/gallery';
import { formerServiceDestinations, quoteHref, serviceBySlug, services, site, type Service } from '@/lib/content';
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
    slug === 'electrical-restoration' ? { width: 1536, height: 1024, alt: service.imageAlt || service.title } : undefined,
  );
}

function ServiceAction({ service, className }: { service: Service; className: string }) {
  const arrow = <span aria-hidden="true">↗</span>;
  return service.emergency
    ? <div className="emergency-action-list">{site.emergencyPhones.map(phone => <a className={className} href={phone.href} key={phone.href}>Call {phone.display} {arrow}</a>)}</div>
    : <Link className={className} href={quoteHref(service.slug)}>Request a quote {arrow}</Link>;
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (Object.hasOwn(formerServiceDestinations, slug)) permanentRedirect(formerServiceDestinations[slug]);
  if (!service) notFound();
  const related = services.filter(item => item.slug !== slug);

  return <>
    <section className={'detail-hero ' + (service.image ? 'detail-hero-image' : '')}>
      <div className="shell detail-hero-grid">
        <div>
          <Link href="/services" className="eyebrow crumb">← All services</Link>
          <span className="detail-kicker">{service.label} / Vancouver, BC</span>
          <h1>{service.title}<span className="period">.</span></h1>
          {service.heroBullets ? <ul className="detail-hero-bullets">{service.heroBullets.map(item => <li key={item}>{item}</li>)}</ul> : <p>{service.intro}</p>}
          <ServiceAction service={service} className="button button-primary" />
        </div>
        {service.image && <div className="detail-photo"><Image src={service.image} alt={service.imageAlt || ''} fill priority sizes="(max-width: 800px) 100vw, 45vw" /></div>}
      </div>
    </section>

    {service.photos && <section className={'service-gallery section shell' + (slug === 'electrical-restoration' ? ' service-gallery-landscape' : '')} aria-labelledby="service-gallery-title">
      <div className="section-heading"><div><span className="eyebrow">{slug === 'electrical-restoration' ? 'Restoration scenarios' : 'Work on site'}</span><h2 id="service-gallery-title">{service.title} in photos.</h2></div><p>{slug === 'electrical-restoration' ? 'Illustrative views of electrical issues that can arise after fire or water damage. Select a photo to take a closer look.' : 'Explore installation photos, from lighting to electrical equipment. Select a photo to take a closer look.'}</p></div>
      <Gallery photos={service.photos} showEndCard={false} />
    </section>}

    <section className="section shell detail-content">
      <div className="detail-main">
        <div><span className="eyebrow">Where we can start</span><h2>{service.focusTitle}</h2><p>{service.focusIntro}</p></div>
        <div className="detail-examples">{service.areas.map((area, index) => <div key={area.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{area.title}</h3><p>{area.description}</p></div></div>)}</div>
        <div className="detail-factors"><span className="eyebrow">What shapes the scope</span><h3>Details that matter.</h3><ul>{service.factors.map(factor => <li key={factor}>{factor}</li>)}</ul></div>
      </div>
      <div className="detail-guidance"><span className="eyebrow">{service.emergency ? 'Before you call' : 'Before you reach out'}</span><h3>What helps us understand the work</h3><p>{service.guidance}</p>{!service.emergency && <p>Photos and plans can be shared during follow-up; the form does not accept attachments.</p>}<ServiceAction service={service} className="text-link" /></div>
    </section>

    <section className="service-faq section shell"><div className="service-faq-intro"><span className="eyebrow">Good to know</span><h2>Common questions.</h2><p>Every property is different. These answers can help you prepare a useful first enquiry.</p></div><div className="faq-list">{service.questions.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>
    <section className="detail-next"><div className="shell detail-next-inner"><div><span className="eyebrow">A useful first step</span><h2>{service.nextTitle}</h2><p>{service.nextText}</p></div><ServiceAction service={service} className="button button-dark" /></div></section>
    <section className="related shell"><span className="eyebrow">Also explore</span><div>{related.map(item => <Link href={'/services/' + item.slug} key={item.slug}>{item.title}<span aria-hidden="true">↗</span></Link>)}</div></section>
  </>;
}
