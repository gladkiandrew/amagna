import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Fraunces } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { MetaPixel } from '@/components/meta-pixel';
import { SITE, SOCIAL_LINKS } from '@/lib/site';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// Fraunces — display serif for headlines/wordmark on the voyage homepage.
// Variable font (weight axis), self-hosted by next/font, display:swap to avoid
// FOIT. Pairing chosen in docs/marketing/brand-guidelines.md (Andrew confirms).
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
  // Optical-size axis: at hero display sizes Fraunces tightens + sharpens
  // (proper opsz rendering instead of the text-optical default).
  axes: ['opsz'],
});

const TITLE = 'Amagna AI — Autonomous Marketing Systems';

// Google Search Console verification token (paste via NEXT_PUBLIC_GSC_VERIFICATION).
// When set, Next renders <meta name="google-site-verification" …>. Empty = omitted.
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: '%s · Amagna AI',
  },
  description: SITE.tagline,
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
  // opengraph-image.tsx is auto-wired into openGraph.images / twitter.images.
  openGraph: {
    type: 'website',
    siteName: 'Amagna AI',
    url: SITE.url,
    title: TITLE,
    description: SITE.tagline,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: SITE.tagline,
  },
};

/** Organization + WebSite structured data, emitted once site-wide. */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: 'Amagna AI',
      url: SITE.url,
      logo: `${SITE.url}/brand/amagna-logo-mark.svg`,
      email: SITE.email,
      description: SITE.tagline,
      areaServed: 'US',
      knowsAbout: [
        'Autonomous marketing systems',
        'AI marketing agency',
        'Marketing automation',
        'Home services marketing',
        'Real estate marketing',
      ],
      ...(SOCIAL_LINKS.length ? { sameAs: [...SOCIAL_LINKS] } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: 'Amagna AI',
      publisher: { '@id': `${SITE.url}/#organization` },
    },
    // Local entity — gives Google a structured signal that Amagna serves the
    // Great Lakes Bay Region (Saginaw / Midland / Bay City, MI). Service-area
    // business: no public street address, so we publish locality + geo + the
    // cities served, not a storefront. No reviews/ratings are claimed.
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE.url}/#localbusiness`,
      name: 'Amagna AI',
      url: SITE.url,
      image: `${SITE.url}/opengraph-image`,
      logo: `${SITE.url}/brand/amagna-logo-mark.svg`,
      email: SITE.email,
      description:
        'AI marketing agency serving Saginaw, Midland, and Bay City — autonomous marketing systems and custom AI installs for local operators.',
      parentOrganization: { '@id': `${SITE.url}/#organization` },
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Saginaw',
        addressRegion: 'MI',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.4195,
        longitude: -83.9508,
      },
      areaServed: [
        { '@type': 'City', name: 'Saginaw', address: { '@type': 'PostalAddress', addressRegion: 'MI', addressCountry: 'US' } },
        { '@type': 'City', name: 'Midland', address: { '@type': 'PostalAddress', addressRegion: 'MI', addressCountry: 'US' } },
        { '@type': 'City', name: 'Bay City', address: { '@type': 'PostalAddress', addressRegion: 'MI', addressCountry: 'US' } },
        { '@type': 'AdministrativeArea', name: 'Great Lakes Bay Region' },
      ],
      knowsAbout: [
        'AI marketing agency',
        'Local SEO',
        'Google Business Profile management',
        'Autonomous marketing systems',
        'Custom AI automation',
      ],
      ...(SOCIAL_LINKS.length ? { sameAs: [...SOCIAL_LINKS] } : {}),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Pixel ID is read at build time via process.env (NEXT_PUBLIC_ inlines into
  // the bundle). Keeping layout static avoids forcing the whole tree dynamic
  // and dodges Anthropic SDK's node:fs paths in the edge build.
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // Sapt first-party analytics — loads on every page. The project ID is public
  // (non-secret); reuse NEXT_PUBLIC_SAPT_PROJECT_ID when set, else the constant.
  const saptProjectId =
    process.env.NEXT_PUBLIC_SAPT_PROJECT_ID || '799ad3ab-fd21-4017-a45a-05b8e6f3cf75';

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} flex min-h-screen flex-col bg-cream antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Sapt first-party analytics (site-wide). */}
        <script src="https://ingest.sapt.ai/v1/track.js" data-project={saptProjectId} defer />
        <MetaPixel pixelId={metaPixelId} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
