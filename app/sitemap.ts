import type { MetadataRoute } from 'next';
import { services, site } from '@/lib/content';
import { isIndexable } from '@/lib/indexing';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable()) return [];
  return ['', '/services', '/work', '/about', '/contact', '/privacy', ...services.map(s => `/services/${s.slug}`)].map(path => ({ url: `${site.origin}${path}`, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 }));
}
