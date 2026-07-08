// Security headers applied to every response. Enforced headers are all
// low-risk. CSP ships as Report-Only first (see below) because the site loads
// third-party embeds (Meta Pixel, Cal.com, Stripe, Turnstile, Supabase); switch
// the header name to 'Content-Security-Policy' to enforce once reports are clean.
const csp = [
  "default-src 'self'",
  // Next.js hydration + Meta Pixel + Stripe + Turnstile + Cal.com need inline/eval.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://js.stripe.com https://challenges.cloudflare.com https://app.cal.com https://cal.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' https: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://api.sapt.ai https://www.facebook.com https://connect.facebook.net https://cal.com https://app.cal.com",
  "frame-src 'self' https://js.stripe.com https://challenges.cloudflare.com https://cal.com https://app.cal.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ');

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  // Report-Only until verified against live third-party embeds, then rename to
  // 'Content-Security-Policy' to enforce.
  { key: 'Content-Security-Policy-Report-Only', value: csp },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't advertise the framework/version (removes x-powered-by: Next.js).
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // /hero-v2 was the preview route for the homepage rebuild. It became "/" on
  // 2026-06-05; this 308 keeps any old bookmarks/links from breaking.
  async redirects() {
    return [
      { source: '/hero-v2', destination: '/', permanent: true },
      // Political Candidates is retired as a serviced industry (CLAUDE.md,
      // 2026-06-15) — replaced by Custom AI Installs. 308 keeps any old links/
      // ad URLs pointing at the live page.
      { source: '/political-candidates', destination: '/custom-ai-installs', permanent: true },
      // Direct-purchase checkout is retired in favour of the Gold-Map-first
      // strategy (CLAUDE.md). Temporary (307) — the Stripe integration is left
      // intact so direct purchase can be re-enabled with new price IDs. Exact
      // source, so /checkout/success (Stripe success_url) is unaffected.
      { source: '/checkout', destination: '/audit', permanent: false },
    ];
  },
};

export default nextConfig;
