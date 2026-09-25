import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { site } from '@/lib/content';
import { isIndexable } from '@/lib/indexing';
import './globals.css';
import './editorial.css';
import './electrical.css';

const bodyFont = localFont({
  src: './fonts/dm-sans-latin.woff2',
  weight: '100 1000',
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: { default: 'Python Electric | Electrical Services in Vancouver, BC', template: '%s | Python Electric' },
  description: 'Electrical work for Vancouver homes, businesses, renovations, repairs, lighting, and new installations. Explore Python Electric services and work.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: site.name, title: 'Python Electric | Electrical Services in Vancouver, BC', description: 'Complete electrical services built around your project in Vancouver, BC.', images: [{ url: '/images/work-1007.jpg', width: 1800, height: 3200, alt: 'Pendant and stair lighting in a residential interior' }] },
  twitter: { card: 'summary_large_image' },
  robots: isIndexable() ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { '@context': 'https://schema.org', '@type': 'Electrician', name: site.name, url: site.origin, areaServed: { '@type': 'City', name: 'Vancouver' }, image: `${site.origin}/images/work-1007.jpg`, sameAs: [site.instagram] };
  return <html lang="en-CA" data-scroll-behavior="smooth" className={bodyFont.variable}><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><main id="main">{children}</main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /></body></html>;
}
