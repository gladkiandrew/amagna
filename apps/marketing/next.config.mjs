/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // /hero-v2 was the preview route for the homepage rebuild. It became "/" on
  // 2026-06-05; this 308 keeps any old bookmarks/links from breaking.
  async redirects() {
    return [{ source: '/hero-v2', destination: '/', permanent: true }];
  },
};

export default nextConfig;
