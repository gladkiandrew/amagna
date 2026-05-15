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
    "We don't sell innovative tech. We fix your problem — for home services owners and real estate agents who want predictable growth.",
} as const;

/** Primary navigation — used by the header and the footer. */
export const NAV_LINKS = [
  { href: '/home-services', label: 'Home services' },
  { href: '/real-estate', label: 'Real estate' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/custom', label: 'Custom' },
  { href: '/about', label: 'About' },
] as const;

/** Where every "Book a call" CTA points (Cal.com booking page). */
export const BOOK_A_CALL_HREF = '/book';

/** Where the primary "Get your free audit" CTA points. */
export const AUDIT_HREF = '/audit';
