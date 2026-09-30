'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { services } from '@/lib/content';

const primary = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Brand() {
  return <span className="brand">PYTHON <b>ELECTRIC</b></span>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const disclosureRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!servicesOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setServicesOpen(false); disclosureRef.current?.focus(); }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', escape); };
  }, [servicesOpen]);
  useEffect(() => {
    if (!open) return;
    const main = document.getElementById('main');
    const footer = document.querySelector('footer');
    const skip = document.querySelector('.skip-link');
    const oldOverflow = document.body.style.overflow;
    main?.setAttribute('inert', '');
    footer?.setAttribute('inert', '');
    skip?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
      if (event.key === 'Tab') {
        const items = [...document.querySelectorAll<HTMLElement>('.mobile-panel a, .mobile-panel button')].filter(item => item.getClientRects().length);
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = oldOverflow;
      main?.removeAttribute('inert');
      footer?.removeAttribute('inert');
      skip?.removeAttribute('inert');
    };
  }, [open]);
  const closeMenu = () => { setOpen(false); toggleRef.current?.focus(); };
  return <>
    <header className={'site-header' + (pathname === '/' ? ' is-home' : '') + (compact ? ' is-compact' : '')}>
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Python Electric home"><Brand /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <div className="nav-services" ref={dropdownRef}>
            <Link href="/services" aria-current={pathname.startsWith('/services') ? 'page' : undefined}>Services</Link>
            <button ref={disclosureRef} type="button" aria-label="Show services" aria-expanded={servicesOpen} aria-controls="service-popover" onClick={() => setServicesOpen(value => !value)}><svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            {servicesOpen && <div id="service-popover" className="service-popover"><span className="eyebrow">Explore services</span>{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`} onClick={() => setServicesOpen(false)}>{service.title}<span aria-hidden="true">↗</span></Link>)}</div>}
          </div>
          {primary.slice(1).map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}
        </nav>
        <Link className="button button-primary header-quote" href="/contact">Request a quote <span aria-hidden="true">↗</span></Link>
        <button ref={toggleRef} className="menu-toggle" type="button" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><span /><span /></button>
      </div>
    </header>
    {open && createPortal(<div className="mobile-backdrop" onPointerDown={event => { if (event.target === event.currentTarget) closeMenu(); }}>
      <div className="mobile-panel" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation">
        <div className="mobile-panel-top"><Brand /><button ref={closeRef} type="button" className="mobile-close" aria-label="Close menu" onClick={closeMenu}>×</button></div>
        {primary.map((item) => <Link className="mobile-main-link" key={item.href} href={item.href} onClick={closeMenu}>{item.label}<span aria-hidden="true">↗</span></Link>)}
        <div className="mobile-service-list"><span className="eyebrow">Services</span>{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeMenu}>{service.title}</Link>)}</div>
        <Link className="button button-primary" href="/contact" onClick={closeMenu}>Request a quote <span aria-hidden="true">↗</span></Link>
      </div>
    </div>, document.body)}
  </>;
}
