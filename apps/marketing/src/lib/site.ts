/**
 * Site-wide configuration shared across the header, footer, and metadata.
 * One source of truth so nav and contact details never drift between surfaces.
 */

export const SITE = {
  name: 'Amagna AI',
  domain: 'amagna.co',
  url: 'https://amagna.co',
  email: 'andrew@amagna.co',
  tagline: 'AI-powered growth systems for home services and real estate operators.',
} as const;

/** Primary navigation — used by the header and the footer. */
export const NAV_LINKS = [
  { href: '/home-services', label: 'Home services' },
  { href: '/real-estate', label: 'Real estate' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/custom', label: 'Custom' },
  { href: '/about', label: 'About' },
] as const;

/** Where every "Book a call" call-to-action points. */
export const BOOK_A_CALL_HREF = '/book';
