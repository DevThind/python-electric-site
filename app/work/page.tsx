import type { Metadata } from 'next';
import { Gallery } from '@/components/gallery';
import { ClosingCta } from '@/components/ui';
import { workPhotos } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata(
  'Our Work',
  'Explore real Python Electric lighting installation photographs from finished spaces.',
  '/work',
);

export default function WorkPage() {
  return <>
    <section className="page-hero shell">
      <span className="eyebrow">Selected work / Python Electric</span>
      <div className="page-hero-grid"><h1>Installed lighting. <em>Real work.</em></h1><p>A selection of finished interior and exterior lighting installations. These images document the visible results of electrical work. Select a photograph to view it larger.</p></div>
    </section>
    <section className="work-page shell"><Gallery photos={workPhotos} /></section>
    <ClosingCta title="Have a project in mind?" text="Tell us what you are planning, from one improvement to the electrical scope of a larger project." />
  </>;
}
