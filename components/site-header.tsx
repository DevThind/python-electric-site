'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { services } from '@/lib/content';

const primary = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Brand() {
  return <span className="brand"><span className="brand-name">PYTHON <b>ELECTRIC</b></span></span>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 32);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
      if (event.key === 'Tab') {
        const items = document.querySelectorAll<HTMLElement>('.mobile-panel a, .mobile-panel button');
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('menu-open');
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('menu-open'); };
  }, [open]);

  return <header className={`site-header ${compact ? 'is-compact' : ''}`}>
    <div className="header-inner shell">
      <Link className="wordmark" href="/" aria-label="Python Electric home"><Brand /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <div className="nav-services"><Link href="/services" aria-current={pathname.startsWith('/services') ? 'page' : undefined}>Services</Link><div className="service-popover"><span className="eyebrow">Explore services</span>{services.map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.title}<span aria-hidden="true">↗</span></Link>)}</div></div>
        {primary.slice(1).map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}
      </nav>
      <Link className="button button-amber header-quote" href="/contact">Get a quote <span aria-hidden="true">↗</span></Link>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><span /><span /></button>
    </div>
    {open && <div className="mobile-backdrop" onClick={() => { setOpen(false); toggleRef.current?.focus(); }}>
      <div className="mobile-panel" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation" onClick={event => event.stopPropagation()}>
        <div className="mobile-panel-top"><Brand /><button ref={closeRef} type="button" className="mobile-close" aria-label="Close menu" onClick={() => { setOpen(false); toggleRef.current?.focus(); }}>×</button></div>
        {primary.map((item, index) => <Link className="mobile-main-link" key={item.href} href={item.href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{item.label}<span aria-hidden="true">↗</span></Link>)}
        <div className="mobile-service-list"><span className="eyebrow">Popular services</span>{services.slice(0, 6).map(service => <Link key={service.slug} href={`/services/${service.slug}`} onClick={() => setOpen(false)}>{service.title}</Link>)}</div>
        <Link className="button button-amber" href="/contact" onClick={() => setOpen(false)}>Start a project <span aria-hidden="true">↗</span></Link>
      </div>
    </div>}
  </header>;
}
