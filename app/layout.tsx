import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { site } from '@/lib/content';
import { isIndexable } from '@/lib/indexing';
import './globals.css';

const bodyFont = localFont({
  src: './fonts/dm-sans-latin.woff2',
  weight: '100 1000',
  variable: '--font-dm-sans',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

const headingFont = localFont({
  src: './fonts/ManropeV5VF.woff2',
  weight: '200 800',
  variable: '--font-manrope',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

const heroFont = localFont({
  src: './fonts/inter-latin.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: { default: 'Python Electric | Electrical Services in Vancouver, BC', template: '%s | Python Electric' },
  description: 'Electrical services for homes and businesses. Serving ' + site.serviceAreas.join(', ') + '.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: site.name, title: 'Python Electric | Electrical Services in Vancouver, BC', description: 'Complete electrical services built around your project in Vancouver, BC.', images: [{ url: '/images/work-1007.jpg', width: 1800, height: 3200, alt: 'Pendant and stair lighting in a residential interior' }] },
  twitter: { card: 'summary_large_image' },
  robots: isIndexable() ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { '@context': 'https://schema.org', '@type': 'Electrician', name: site.name, url: site.origin, email: site.email, areaServed: site.serviceAreas.map(name => ({ '@type': 'Place', name })), image: `${site.origin}/images/work-1007.jpg`, sameAs: [site.instagram] };
  return <html lang="en-CA" data-scroll-behavior="smooth" className={`${bodyFont.variable} ${headingFont.variable} ${heroFont.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><main id="main">{children}</main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /></body></html>;
}
