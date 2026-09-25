import Image from 'next/image';
import Link from 'next/link';
import { quoteHref, type WorkPhoto } from '@/lib/content';

export function ArrowLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <Link className={'arrow-link ' + (light ? 'arrow-link-light' : '')} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}

export function SectionIntro({ eyebrow, title, text, action }: { eyebrow: string; title: string; text?: string; action?: { href: string; label: string } }) {
  return <div className="section-intro"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><div className="section-intro-side">{text && <p>{text}</p>}{action && <ArrowLink href={action.href}>{action.label}</ArrowLink>}</div></div>;
}

export function Photo({ photo, className = '', priority = false, sizes = '(max-width: 700px) 100vw, 50vw' }: { photo: WorkPhoto; className?: string; priority?: boolean; sizes?: string }) {
  return <div className={'photo-frame ' + className}><Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} style={{ objectPosition: photo.focal }} /></div>;
}

export function ClosingCta({ title = "Let's talk about what's next.", text = 'Tell us about the property, what you want to change, and the electrical work you have in mind.' }: { title?: string; text?: string }) {
  return <section className="closing-cta"><div className="shell closing-inner"><div><span className="eyebrow">Begin the conversation</span><h2>{title}</h2><p>{text}</p></div><Link className="button button-amber" href={quoteHref()}>Discuss your project <span aria-hidden="true">↗</span></Link></div></section>;
}
