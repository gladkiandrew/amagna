import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/** Every public route on the marketing site. Keep in sync as pages are added. */
const ROUTES = [
  '',
  '/who-we-serve',
  '/home-services',
  '/real-estate',
  '/pricing',
  '/custom',
  '/custom-quote',
  '/book',
  '/about',
  '/crew',
] as const;

/** Generated at /sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
