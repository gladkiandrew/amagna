/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // /hero-v2 was the preview route for the homepage rebuild. It became "/" on
  // 2026-06-05; this 308 keeps any old bookmarks/links from breaking.
  async redirects() {
    return [
      { source: '/hero-v2', destination: '/', permanent: true },
      // Direct-purchase checkout is retired in favour of the Gold-Map-first
      // strategy (CLAUDE.md). Temporary (307) — the Stripe integration is left
      // intact so direct purchase can be re-enabled with new price IDs. Exact
      // source, so /checkout/success (Stripe success_url) is unaffected.
      { source: '/checkout', destination: '/audit', permanent: false },
    ];
  },
};

export default nextConfig;
