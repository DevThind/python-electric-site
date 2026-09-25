import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';
import { isIndexable } from '@/lib/indexing';
export default function robots(): MetadataRoute.Robots {
  return isIndexable() ? { rules: { userAgent: '*', allow: '/' }, sitemap: `${site.origin}/sitemap.xml` } : { rules: { userAgent: '*', disallow: '/' } };
}
