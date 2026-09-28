import Image from 'next/image';
import Link from 'next/link';
import { HeroVideo } from '@/components/hero-video';
import { ClosingCta } from '@/components/ui';
import { services } from '@/lib/content';

const serviceImages: Record<string, string> = {
  'residential-electrical': '/images/service-residential.webp',
  'commercial-electrical': '/images/service-commercial.webp',
  'ev-chargers': '/images/service-ev-chargers.webp',
  'electrical-restoration': '/images/service-restoration.webp',
};

const faqs = [
  ['Do I need plans before getting in touch?', 'No. A short description is enough to begin. Photos, plans, or equipment details can be shared during follow-up.'],
  ['Can I ask about a small repair?', 'Yes. Tell us what is happening, where it happens, and whether the issue is ongoing or intermittent.'],
  ['Can the form give me a firm quote?', 'The form starts the conversation. The existing setup, access, and work involved may need a closer review before a scope can be confirmed.'],
];

export default function Home() {
  return <>
    <section className="home-hero">
      <HeroVideo />
      <div className="home-hero-shade" />
      <div className="shell home-hero-content">
        <span className="eyebrow hero-eyebrow">Vancouver, British Columbia</span>
        <h1><span>Electrical services</span>{' '}<span>for Vancouver homes</span>{' '}<span>and businesses.</span></h1>
        <p>From repairs and lighting to renovations, EV charging, and restoration, start with the electrical work your space needs.</p>
        <div className="hero-actions"><Link className="button button-primary" href="/contact">Request a quote <span aria-hidden="true">↗</span></Link><Link className="button button-ghost" href="/services">Explore services <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
    <section className="home-intro section" aria-labelledby="home-intro-title">
      <div className="shell home-intro-grid">
        <div className="home-intro-heading">
          <span className="eyebrow">Python Electric / Vancouver</span>
          <h2 id="home-intro-title">Work that begins with the right details.</h2>
        </div>
        <div className="home-intro-copy">
          <p className="home-intro-lead">Electrical services for homes, business spaces, and projects taking shape in Vancouver.</p>
          <p>From a repair to a renovation, tell us what your space needs. We start with the details of your site and the work you have in mind.</p>
          <Link href="/about" className="text-link">More about us <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
    <section className="home-services section" id="services"><div className="shell">
      <div className="section-heading"><div><span className="eyebrow">What we do</span><h2>Electrical work, clearly scoped.</h2></div><p>Choose the closest starting point. We can discuss the details of your property and project from there.</p></div>
      <div className="home-service-grid">{services.map((service, index) => <Link href={'/services/' + service.slug} className="home-service-card" key={service.slug}>
        <div className="home-service-image"><Image src={serviceImages[service.slug]} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
        <div className="home-service-body"><span className="card-number">0{index + 1} / {service.label}</span><h3>{service.title}</h3><p>{service.short}</p><span className="card-link">Explore service <span aria-hidden="true">↗</span></span></div>
      </Link>)}</div>
    </div></section>
    <section className="home-process section"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Getting started</span><h2>A simple first step.</h2></div><p>Share enough to begin. The finer details can follow in conversation.</p></div><div className="process-grid"><div><span>01</span><h3>Describe the work</h3><p>Tell us what needs repair, installation, or planning.</p></div><div><span>02</span><h3>Set the context</h3><p>Include your area, property type, and any timing that matters.</p></div><div><span>03</span><h3>Continue the conversation</h3><p>Photos, plans, and equipment details can be shared during follow-up.</p></div></div></div></section>
    <section className="home-faq section"><div className="shell faq-layout"><div><span className="eyebrow">Common questions</span><h2>Before you get in touch.</h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <ClosingCta title="Tell us what you have in mind." text="A short description is enough to start a conversation about the electrical work ahead." />
  </>;
}
