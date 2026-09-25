import Image from 'next/image';
import Link from 'next/link';
import { HeroVideo } from '@/components/hero-video';
import { ArrowLink } from '@/components/ui';
import { services } from '@/lib/content';

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
        <div><span className="eyebrow">Electrical services</span><h2>Work for the spaces<br /><em>you count on.</em></h2></div>
        <p>From everyday repairs to new installations, EV charging, and restoration. Find the right place to start.</p>
      </div>
      <div className="reference-service-grid">
        {services.map(service => <Link href={'/services/' + service.slug} className="service-showcase-card" key={service.slug}>
          <div className="service-showcase-media">
            <Image
              src={serviceImages[service.slug].src}
              alt={serviceImages[service.slug].alt}
              fill
              sizes="(max-width: 760px) calc(100vw - 36px), (max-width: 1100px) 45vw, 22vw"
              style={{ objectPosition: serviceImages[service.slug].position }}
            />
          </div>
          <div className="service-showcase-body">
            <h3>{service.title}</h3>
            <span className="service-showcase-link">Explore service <b aria-hidden="true">↗</b></span>
          </div>
        </Link>)}
      </div>
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
