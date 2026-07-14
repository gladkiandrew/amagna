/**
 * Site-wide configuration shared across the header, footer, and metadata.
 * One source of truth so nav and contact details never drift between surfaces.
 */

export const SITE = {
  name: 'Amagna AI',
  domain: 'amagna.co',
  url: 'https://amagna.co',
  email: 'andrew@amagna.co',
  tagline:
    'Autonomous intelligence systems — we build the second brain that runs your marketing and operations, and the content that fuels it, for operators who want growth that runs itself.',
} as const;

/** Primary navigation links — used by the header and footer. The Gold Map CTA
 *  is a styled button rendered separately (see GOLD_MAP_CTA), not a plain link.
 *  Field Notes lives in the footer only (removed from the top nav, run 7). */
export const NAV_LINKS = [
  { href: '/who-we-serve', label: 'Who We Serve' },
  { href: '/about', label: 'Our Story' },
  { href: '/pricing', label: 'Pricing' },
] as const;

/** Where every "Book a call" CTA points (Cal.com booking page). */
export const BOOK_A_CALL_HREF = '/book';

/** Direct Cal.com booking link — hero secondary CTA wires here (no detour). */
export const CALCOM_DIRECT_URL = 'https://cal.com/andrew-gladki-6glrmg/amagna-ai-discovery-call';

/** Where the primary "Get your free audit" CTA points. */
export const AUDIT_HREF = '/audit';

/** The #1 site-wide CTA (run 7 North Star): the Gold Map funnel at /audit. */
export const GOLD_MAP_CTA = { href: '/audit', label: 'Get Your Gold Map' } as const;

/** Blog / Field Notes index (footer link). */
export const FIELD_NOTES_HREF = '/blog';

/**
 * Public social profiles for the Amagna AI brand. Used for the Organization
 * JSON-LD `sameAs` (helps SEO/knowledge-graph + AEO). Add the real agency
 * profile URLs as they go live — entries are emitted only when non-empty, so
 * leaving this empty is safe. (Andrew: paste the agency handles here.)
 */
export const SOCIAL_LINKS: readonly string[] = [
  // 'https://www.instagram.com/...',
  // 'https://www.linkedin.com/company/...',
  // 'https://www.facebook.com/...',
  // 'https://www.youtube.com/@...',
  // 'https://x.com/...',
];

/**
 * Standard Open Graph image — the generated `opengraph-image` route. Reused in
 * per-page `openGraph` overrides: defining a page-level `openGraph` drops the
 * image that the file convention auto-wires into the root layout, so each page
 * that sets its own OG title/description must re-attach this. Relative URL is
 * resolved to absolute via the layout's `metadataBase`.
 */
export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Amagna AI — autonomous intelligence systems for operators who want growth that runs itself',
} as const;

/**
 * Force a URL to absolute against the site origin. LinkedIn (and other social
 * scrapers) require ABSOLUTE og:image / og:url — they do not resolve relative
 * paths the way a browser does with metadataBase. Sapt CMS asset URLs may come
 * back absolute (CDN) or relative; this normalizes either. Returns undefined
 * for empty input so callers can fall back cleanly.
 */
export function absoluteUrl(u?: string | null): string | undefined {
  if (!u) return undefined;
  if (/^https?:\/\//i.test(u)) return u;
  return `${SITE.url}${u.startsWith('/') ? '' : '/'}${u}`;
}

/** OG_IMAGE with an explicitly-absolute url (safe to hand to social scrapers). */
export const OG_IMAGE_ABSOLUTE = {
  ...OG_IMAGE,
  url: `${SITE.url}${OG_IMAGE.url}`,
} as const;
