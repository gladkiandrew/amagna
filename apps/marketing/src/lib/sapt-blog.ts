import 'server-only';
import { env } from './env';
import type { BlogPost, BlogSource } from './blog-types';
import { FALLBACK_POSTS } from './blog-fallback';

/**
 * Read-only Sapt CMS client for blog posts, with a local fallback.
 *
 * Source of truth is the Sapt `blog-post` content type. When the Worker has
 * `SAPT_API_KEY` + `SAPT_PROJECT_ID` set, we read the live CMS; otherwise (or on
 * any error) we serve `FALLBACK_POSTS` so `/blog` is never empty and never crashes.
 *
 * Sapt REST API (confirmed via docs.sapt.ai OpenAPI):
 *   GET {base}/projects/{projectId}/cms/content/blog-post?status=published
 *   GET {base}/projects/{projectId}/cms/content/blog-post/{slug}
 *   Header: `Authorization: ApiKey sapt_…`
 *   Response: { items: [{ id, slug, name, content:{…}, status, publishedAt, tags }], total }
 */

const CONTENT_TYPE = 'blog-post';
const DEFAULT_BASE = 'https://api.sapt.ai';
const FETCH_TIMEOUT_MS = 6000;

type SaptItem = {
  slug?: string;
  name?: string;
  status?: string;
  publishedAt?: string | number | null;
  tags?: unknown;
  content?: Record<string, unknown>;
};

function asString(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim().length > 0 ? v.trim() : undefined;
}

function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === 'string');
  const s = asString(v);
  return s ? s.split(',').map((x) => x.trim()).filter(Boolean) : [];
}

function toIsoDate(v: unknown): string | undefined {
  if (typeof v === 'number') return new Date(v).toISOString().slice(0, 10);
  const s = asString(v);
  if (!s) return undefined;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? s : d.toISOString().slice(0, 10);
}

/** Map a Sapt item to a BlogPost; return null if it's missing essentials. */
function coerceItem(item: SaptItem): BlogPost | null {
  const c = item.content ?? {};
  const slug = asString(c.slug) ?? asString(item.slug);
  const title = asString(c.title) ?? asString(item.name);
  const body = asString(c.body);
  // Only published posts are public — guard on the content field too.
  const publishStatus = asString(c.publishStatus);
  if (!slug || !title || !body) return null;
  if (publishStatus && publishStatus !== 'published') return null;

  return {
    slug,
    title,
    body,
    excerpt: asString(c.excerpt) ?? '',
    author: asString(c.author) ?? 'The Amagna Crew',
    publishedAt: toIsoDate(c.publishedAt) ?? toIsoDate(item.publishedAt) ?? '',
    category: asString(c.category) ?? 'Field Notes',
    heroImage: asString(c.heroImage),
    seoTitle: asString(c.seoTitle),
    seoDescription: asString(c.seoDescription),
    targetKeywords: asStringArray(c.targetKeywords),
    tags: asStringArray(item.tags),
  };
}

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/** Fetch raw published items from Sapt, or null if unconfigured/errored. */
async function fetchSaptItems(): Promise<SaptItem[] | null> {
  const key = env('SAPT_API_KEY');
  const projectId = env('SAPT_PROJECT_ID');
  const base = env('SAPT_API_URL') ?? DEFAULT_BASE;
  if (!key || !projectId) return null; // not keyed yet → fallback

  const url = `${base}/projects/${encodeURIComponent(projectId)}/cms/content/${CONTENT_TYPE}?status=published&limit=100`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { Authorization: `ApiKey ${key}`, Accept: 'application/json' },
      signal: controller.signal,
      // Cache at the framework layer; revalidate hourly so new posts appear.
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`[sapt-blog] list returned HTTP ${res.status}; using fallback`);
      return null;
    }
    const json = (await res.json()) as { items?: SaptItem[] };
    return Array.isArray(json.items) ? json.items : [];
  } catch (err) {
    console.warn('[sapt-blog] list fetch failed; using fallback:', (err as Error).message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** All published posts, newest first. Falls back to local posts when unkeyed. */
export async function getPublishedPosts(): Promise<{ posts: BlogPost[]; source: BlogSource }> {
  const items = await fetchSaptItems();
  if (items === null) return { posts: sortByDateDesc(FALLBACK_POSTS), source: 'fallback' };
  const posts = items.map(coerceItem).filter((p): p is BlogPost => p !== null);
  // If Sapt is keyed but returned nothing usable, still show the fallback so the
  // page is never empty (and log it).
  if (posts.length === 0) {
    console.warn('[sapt-blog] keyed but no usable posts; using fallback');
    return { posts: sortByDateDesc(FALLBACK_POSTS), source: 'fallback' };
  }
  return { posts: sortByDateDesc(posts), source: 'sapt' };
}

/** A single post by slug, or null if not found. */
export async function getPostBySlug(
  slug: string,
): Promise<{ post: BlogPost | null; source: BlogSource }> {
  const { posts, source } = await getPublishedPosts();
  return { post: posts.find((p) => p.slug === slug) ?? null, source };
}
