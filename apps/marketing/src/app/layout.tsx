import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SITE } from '@/lib/site';

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

const TITLE = 'Amagna AI — AI growth systems for home services & real estate';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: '%s · Amagna AI',
  },
  description: SITE.tagline,
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
      email: SITE.email,
      description: SITE.tagline,
      areaServed: 'US',
      knowsAbout: ['Home services marketing', 'Real estate marketing', 'AI marketing agency'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: 'Amagna AI',
      publisher: { '@id': `${SITE.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-cream antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
