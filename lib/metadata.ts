import type { Metadata } from 'next';
import { site } from '@/lib/content';

export function pageMetadata(title: string, description: string, path: string, image = '/images/work-1007.jpg', imageDetails?: { width: number; height: number; alt: string }): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website', siteName: site.name, title: fullTitle, description, url: path,
      images: [{ url: image, width: imageDetails?.width ?? 1800, height: imageDetails?.height ?? 3200, alt: imageDetails?.alt ?? (image.includes('1034') ? 'Recessed lighting along a residential exterior roofline' : 'Pendant and stair lighting in a residential interior') }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] },
  };
}
