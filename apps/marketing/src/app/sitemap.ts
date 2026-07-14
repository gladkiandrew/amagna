import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { getPublishedPosts } from '@/lib/sapt-blog';

/** Every static public route on the marketing site. Keep in sync as pages are added. */
const ROUTES = [
  '',
  '/audit',
  '/blog',
  '/who-we-serve',
  '/home-services',
  '/real-estate',
  '/medical-offices',
  '/dental-marketing',
  '/med-spa-marketing',
  '/chiropractor-marketing',
  '/physical-therapy-marketing',
  '/optometry-marketing',
  '/dermatology-marketing',
  '/ecommerce-brands',
  '/multi-location',
  '/roofing-marketing',
  '/hvac-marketing',
  '/plumbing-marketing',
  '/electrician-marketing',
  '/facebook-ads-contractors',
  '/google-ads-home-services',
  '/ai-video-ads',
  '/michigan',
  '/saginaw',
  '/midland',
  '/bay-city',
  '/lansing',
  '/custom-ai-installs',
  '/pricing',
  '/custom',
  '/book',
  '/about',
  '/privacy',
  '/terms',
] as const;
// Deliberately excluded: /crew, /custom-quote, /political-candidates (308
// redirects), /grow, /voyage-v1 (noindex funnels/legacy), /checkout/success.

// Re-generate hourly so newly-published blog posts enter the sitemap.
export const revalidate = 3600;

// Real content-update date for the static pages — a STABLE constant, not a
// per-request `new Date()`, so the sitemap doesn't falsely tell crawlers every
// page changed on every build (that wastes crawl budget and dilutes the signal).
// Never a fabricated date. Bump to the real date when the static marketing pages
// get a meaningful content pass.
const STATIC_LASTMOD = new Date('2026-07-08T00:00:00Z');

/** Generated at /sitemap.xml. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : route === '/audit' ? 0.9 : 0.8,
  }));

  // Blog posts (Sapt-backed, or local fallback). Never let a CMS hiccup break
  // the sitemap — getPublishedPosts already falls back and never throws.
  // lastmod uses the post's REAL publish timestamp (never backdated); on-page
  // dates are hidden per Phase 4 but the sitemap keeps the true modification date.
  const { posts } = await getPublishedPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : STATIC_LASTMOD,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
