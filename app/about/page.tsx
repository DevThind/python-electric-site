import type { Metadata } from 'next';
import Link from 'next/link';
import { ClosingCta, Photo } from '@/components/ui';
import { photoById } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata(
  'About Python Electric',
  'Learn about Python Electric and how to begin a residential or commercial electrical enquiry in Vancouver, BC.',
  '/about',
);

const enquiryDetails = [
  ['The property', 'A home, business space, or site under construction—and the city or area it is in.'],
  ['The work', 'What needs to be installed, repaired, upgraded, or planned, in your own words.'],
  ['The context', 'Your project stage, rough timing, and any drawings, photographs, or fixture details you have.'],
];

export default function AboutPage() {
  return <>
    <section className="page-hero shell">
      <span className="eyebrow">About / Python Electric</span>
      <div className="page-hero-grid"><h1>Electrical work starts <em>with the right questions.</em></h1><p>Python Electric is based in Vancouver and welcomes electrical enquiries for homes, business properties, renovations, and construction.</p></div>
    </section>
    <section className="about-page shell">
      <div className="about-page-photo"><Photo photo={photoById('1034')} priority sizes="(max-width: 800px) 100vw, 50vw" /></div>
      <div className="about-page-copy">
        <span className="eyebrow">What we work on</span>
        <h2>From electrical issues to new installations.</h2>
        <p>Python Electric welcomes enquiries about repairs, upgrades, wiring, lighting, and electrical work within larger projects. The photos on this site show finished lighting installations from that wider offering.</p>
        <p>The right starting point depends on the property and the electrical system already in place. An existing home, an active business, and a new build each call for different questions before the work can be scoped.</p>
        <Link className="button button-dark" href="/services">Explore our services <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
    <section className="about-principles shell">
      <div><span className="eyebrow">A useful first conversation</span><h2>Bring the project <em>as it is.</em></h2><p>You do not need a technical brief to get in touch. These details are a helpful place to begin.</p></div>
      <ol className="about-checklist">{enquiryDetails.map(([title, detail], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{detail}</p></div></li>)}</ol>
    </section>
    <ClosingCta />
  </>;
}
