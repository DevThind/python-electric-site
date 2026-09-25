import Image from 'next/image';
import Link from 'next/link';
import { HeroVideo } from '@/components/hero-video';
import { ArrowLink } from '@/components/ui';
import { services } from '@/lib/content';

const homeServiceOrder = [
  'residential-electrical', 'commercial-electrical', 'panels-circuits-upgrades', 'repairs-maintenance',
  'construction-rewiring', 'lighting', 'ev-chargers', 'electrical-restoration',
];
const homeServices = homeServiceOrder.flatMap(slug => services.filter(service => service.slug === slug));

const serviceImages: Record<string, { src: string; alt: string; position: string }> = {
  'residential-electrical': {
    src: '/images/service-residential.webp',
    alt: 'Illustration of a modern home with warm exterior lighting at dusk',
    position: 'center 51%',
  },
  'commercial-electrical': {
    src: '/images/service-commercial.webp',
    alt: 'Illustration of an electrician beneath linear lighting in a commercial workspace',
    position: 'center 48%',
  },
  'panels-circuits-upgrades': {
    src: '/images/service-panels.webp',
    alt: 'Illustration of an open electrical panel with rows of circuit breakers',
    position: '61% center',
  },
  'repairs-maintenance': {
    src: '/images/service-repairs.webp',
    alt: 'Illustration of an electrician fitting a wall switch in a home',
    position: '60% center',
  },
  'construction-rewiring': {
    src: '/images/service-construction.webp',
    alt: 'Illustration of an electrician working on wiring inside a renovation',
    position: 'center 50%',
  },
  lighting: {
    src: '/images/service-lighting.webp',
    alt: 'Illustration of warm lighting in a modern kitchen and dining room',
    position: 'center 48%',
  },
  'ev-chargers': {
    src: '/images/service-ev-chargers.webp',
    alt: 'Illustration of an electric car connected to a home charger',
    position: 'center 50%',
  },
  'electrical-restoration': {
    src: '/images/service-restoration.webp',
    alt: 'Illustration of an electrician testing an outlet during an assessment',
    position: '55% center',
  },
};

const faqs = [
  ['Do I need plans before getting in touch?', 'No. A short description is enough to begin. If you have drawings, photos, equipment details, or a schedule, include them with your enquiry.'],
  ['Can I ask about a small repair or a larger project?', 'Yes. Get in touch about repairs, installations, upgrades, lighting, and electrical work within renovations or construction.'],
  ['Can the form give me a firm quote?', 'The form starts the conversation. Existing conditions, equipment, access, and the work involved may need a closer assessment before a scope can be confirmed.'],
];

function ServiceIcon({ slug }: { slug: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (slug === 'residential-electrical') return <svg viewBox="0 0 48 48" aria-hidden="true" {...common}><path d="M5 22 24 7l19 15v19H5V22Z"/><path d="M19 41V27h10v14M17 20h14M24 16v8"/></svg>;
  if (slug === 'commercial-electrical') return <svg viewBox="0 0 48 48" aria-hidden="true" {...common}><path d="M8 41V10h32v31H8ZM4 41h40M16 17h5m6 0h5m-16 8h5m6 0h5m-16 8h5m6 0h5M22 41V33h4v8"/></svg>;
  if (slug === 'panels-circuits-upgrades') return <svg viewBox="0 0 48 48" aria-hidden="true" {...common}><rect x="10" y="5" width="28" height="38" rx="2"/><path d="M17 13h14M17 20h6m8 0h-3M17 27h3m11 0h-6M17 34h14M23 18v4m3 3v4"/></svg>;
  if (slug === 'construction-rewiring') return <svg viewBox="0 0 48 48" aria-hidden="true" {...common}><path d="M7 42V9h34v33M7 20h34M17 9v33m14-33v33M4 42h40"/><path d="M22 26h4v7h-4z"/></svg>;
  if (slug === 'lighting') return <svg viewBox="0 0 48 48" aria-hidden="true" {...common}><path d="M17 31c-4-3-6-7-6-12a13 13 0 0 1 26 0c0 5-2 9-6 12M17 31h14v6H17zM19 41h10M24 10v9m-5-3 5 3 5-3"/></svg>;
  if (slug === 'ev-chargers') return <svg viewBox="0 0 48 48" aria-hidden="true" {...common}><rect x="8" y="6" width="20" height="36" rx="2"/><path d="M13 12h10v11H13zM18 28v8m10-22h4l4 5v15a5 5 0 0 0 10 0v-8h-6"/></svg>;
  if (slug === 'electrical-restoration') return <svg viewBox="0 0 48 48" aria-hidden="true" {...common}><path d="m27 5-13 20h9l-2 18 14-22h-9zM8 11a20 20 0 0 1 11-7M40 37a20 20 0 0 1-11 7"/></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true" {...common}><path d="M7 39h34M24 5v9m-8-5 5 8m11-8-5 8M13 24h22v15H13V24ZM19 24v-5h10v5M19 31h10"/></svg>;
}

export default function Home() {
  return <div className="reference-home electrical-home">
    <section className="reference-hero">
      <HeroVideo />
      <div className="reference-hero-shade" />
      <div className="reference-hero-content shell">
        <span className="eyebrow reference-hero-kicker"><span className="signal-dot" /> Vancouver, BC · Electrical services</span>
        <h1><span className="hero-title-lead">Electrical work</span><em>that works for you.</em></h1>
        <p>Repairs, installations, panel and circuit upgrades, and project electrical work for homes and businesses.</p>
        <div className="reference-hero-actions">
          <Link className="button button-amber" href="/contact">Request a quote <span aria-hidden="true">↗</span></Link>
          <Link className="button reference-ghost-button" href="/services">Explore services <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>

    <section className="reference-services" id="services"><div className="shell">
      <div className="reference-services-intro">
        <span className="eyebrow">Electrical services</span>
        <h2>From the panel<br />to the <em>final connection.</em></h2>
        <p>Start with the type of work you need. We cover everyday electrical issues and larger installation projects across residential and commercial properties.</p>
      </div>
      <div className="reference-service-grid">
        {homeServices.map(service => <Link href={'/services/' + service.slug} className="service-showcase-card" key={service.slug}>
          <div className="service-showcase-media">
            <Image
              src={serviceImages[service.slug].src}
              alt={serviceImages[service.slug].alt}
              fill
              sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 1100px) 42vw, 21vw"
              style={{ objectPosition: serviceImages[service.slug].position }}
            />
          </div>
          <div className="service-showcase-body">
            <span className="service-showcase-icon" aria-hidden="true"><ServiceIcon slug={service.slug} /></span>
            <h3>{service.title}</h3>
            <span className="service-showcase-link">Explore service <b aria-hidden="true">↗</b></span>
          </div>
        </Link>)}
      </div>
      <Link className="button reference-all-services" href="/services">See all electrical services <span aria-hidden="true">↗</span></Link>
    </div></section>

    <section className="trade-scope shell">
      <div className="trade-scope-copy">
        <span className="eyebrow">Built around the work</span>
        <h2>Tell us what needs <em>power, repair,</em> or change.</h2>
        <p>A tripping circuit, a planned installation, and a renovation each need a different starting point. Share what is happening at the property and what you need the electrical system to support.</p>
        <p>We can discuss the existing setup, the equipment involved, and the next step needed to define the work.</p>
        <ArrowLink href="/contact">Start an electrical enquiry</ArrowLink>
      </div>
      <div className="trade-scope-panel" aria-label="Common details for an electrical enquiry">
        <div className="trade-panel-head"><span>Project intake</span><span>Python Electric / Vancouver</span></div>
        <div className="trade-panel-title">What to share<br /><strong>at the start</strong></div>
        <div className="trade-panel-lines">
          <div><span>01</span><b>Property</b><small>Home, business, or construction site</small></div>
          <div><span>02</span><b>Electrical need</b><small>Issue, installation, or planned upgrade</small></div>
          <div><span>03</span><b>Useful details</b><small>Photos, equipment, drawings, and timing</small></div>
        </div>
        <span className="trade-panel-foot">A clear starting point for a useful conversation <b aria-hidden="true">↗</b></span>
      </div>
    </section>

    <section className="reference-faq shell">
      <div><span className="eyebrow">Common questions</span><h2>Before you <em>get in touch.</em></h2></div>
      <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    </section>
  </div>;
}
