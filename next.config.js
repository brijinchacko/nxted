/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react', 'framer-motion'],
  },
  async redirects() {
    return [
      // /blog is an alias for the established, DB-backed /research blog
      { source: '/blog', destination: '/research', permanent: true },
      { source: '/blog/:slug', destination: '/research/:slug', permanent: true },
      // collapse the duplicate cookie route onto the canonical legal page
      { source: '/privacy/cookies', destination: '/legal/cookies', permanent: true },
    ];
  },
};

module.exports = nextConfig;
