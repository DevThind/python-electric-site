import type { Metadata } from 'next';
import Link from 'next/link';
import { ClosingCta, Photo } from '@/components/ui';
import { ServiceAreas } from '@/components/service-areas';
import { photoById } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata('About Python Electric', 'Founded in 2022, Python Electric provides electrical services for homes and businesses from its base in Vancouver, BC.', '/about');

export default function AboutPage() {
  return <>
    <section className="page-hero shell"><span className="eyebrow">About / Python Electric</span><div className="page-hero-grid"><h1>Electrical work for spaces people use.</h1><p>Founded in 2022, Python Electric is based in Vancouver and welcomes enquiries for homes, business properties, renovations, and construction.</p></div></section>
    <section className="about-page shell"><div className="about-page-photo"><Photo photo={photoById('1034')} priority sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="about-page-copy"><span className="eyebrow">What we work on</span><h2>From everyday repairs to new installations.</h2><p>Our service areas include residential and commercial electrical work, EV charging, and restoration after property damage. The photography on this site shows real, finished lighting installations from that wider offering.</p><p>Each enquiry begins with the existing property, what needs to change, and how the space is used. Share the work in your own words; the details can be worked through together.</p><Link className="button button-dark" href="/services">Explore services <span aria-hidden="true">↗</span></Link></div></section>
    <ServiceAreas />
    <ClosingCta title="Have electrical work in mind?" text="Tell us about the property and what needs attention. Photos or plans can be shared during follow-up." />
  </>;
}
