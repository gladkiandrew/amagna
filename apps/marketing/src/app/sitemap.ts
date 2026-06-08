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
  '/ecommerce-brands',
  '/multi-location',
  '/political-candidates',
  '/pricing',
  '/custom',
  '/book',
  '/about',
] as const;

// Re-generate hourly so newly-published blog posts enter the sitemap.
export const revalidate = 3600;

/** Generated at /sitemap.xml. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : route === '/audit' ? 0.9 : 0.8,
  }));

  // Blog posts (Sapt-backed, or local fallback). Never let a CMS hiccup break
  // the sitemap — getPublishedPosts already falls back and never throws.
  const { posts } = await getPublishedPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
