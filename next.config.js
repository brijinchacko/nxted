/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      { hostname: "img.clerk.com" },
      { hostname: "nxted.ai" },
      { hostname: "oforo.ai" },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["nxted.ai", "www.nxted.ai", "localhost:3010"],
    },
  },
};

module.exports = nextConfig;
