/**
 * Shared blog types. The canonical source of blog content is the Sapt CMS
 * `blog-post` content type (read via `sapt-blog.ts`); these types model the
 * subset of fields the website renders. The local fallback (`blog-fallback.ts`)
 * implements the same shape so `/blog` works before the Sapt key is set.
 */

export type BlogPost = {
  /** URL slug — `/blog/<slug>`. Unique. */
  slug: string;
  title: string;
  /** Short summary for cards + meta description fallback. */
  excerpt: string;
  /** Post body in Markdown (rendered by `lib/markdown.ts`). */
  body: string;
  author: string;
  /** ISO-8601 date string (e.g. `2026-05-28`). */
  publishedAt: string;
  /** Editorial category, e.g. "Foundations". */
  category: string;
  /** Optional hero image URL (absolute or site-relative). */
  heroImage?: string;
  /**
   * Optional hero video URL (e.g. a Hyperframes-generated clip). When present,
   * the article renders an autoplaying, muted, looping hero video instead of the
   * static hero image. Used on the article page only — list cards stay static.
   */
  heroVideo?: string;
  /**
   * Optional still-frame poster for `heroVideo` (shown before the clip loads and
   * for reduced-motion users). Falls back to `heroImage`, then the AM monogram.
   * Also used as the static poster on `/blog` list cards.
   */
  heroPoster?: string;
  /** Per-post SEO overrides; fall back to title/excerpt when absent. */
  seoTitle?: string;
  seoDescription?: string;
  /** Keywords the post targets (used for meta keywords + internal signal). */
  targetKeywords: string[];
  /** Free-form item tags. */
  tags: string[];
};

/** Where a post list came from — surfaced for diagnostics/logging only. */
export type BlogSource = 'sapt' | 'fallback';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Format an ISO date (`2026-05-28`) as `May 28, 2026`, locale-independently so
 * server and client render identically (no hydration drift). Returns '' on bad input.
 */
export function formatPostDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return '';
  const [, y, mo, d] = m;
  const month = MONTHS[Number(mo) - 1];
  if (!month) return '';
  return `${month} ${Number(d)}, ${y}`;
}
