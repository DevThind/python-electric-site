import Link from 'next/link';
import { services, site } from '@/lib/content';

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="shell footer-top">
      <div className="footer-intro">
        <Link className="footer-wordmark" href="/">PYTHON <span>ELECTRIC</span></Link>
        <p>Electrical work for homes, businesses, and projects taking shape.</p>
        <p>Based in Vancouver, British Columbia.</p>
      </div>
      <div className="footer-links">
        <div><span className="eyebrow">Explore</span><Link href="/services">All services</Link><Link href="/work">Selected work</Link><Link href="/about">About</Link><Link href="/contact">Start an enquiry</Link></div>
        <div><span className="eyebrow">Services</span>{services.slice(0, 5).map(service => <Link key={service.slug} href={'/services/' + service.slug}>{service.title}</Link>)}</div>
        <div><span className="eyebrow">Connect</span><Link href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</Link><Link href="/privacy">Privacy</Link></div>
      </div>
    </div>
    <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Python Electric</span><span>Vancouver, BC · <Link href="/privacy">Privacy policy</Link></span></div>
  </footer>;
}
