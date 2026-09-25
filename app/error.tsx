'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }: { reset: () => void }) { return <section className="state-page shell"><span className="eyebrow">Something went wrong</span><h1>We couldn’t load this page.</h1><p>Please try again. If the problem continues, start from the homepage.</p><div><button className="button button-amber" onClick={reset}>Try again <span aria-hidden="true">↗</span></button><Link className="arrow-link" href="/">Back to Home <span aria-hidden="true">↗</span></Link></div></section>; }
