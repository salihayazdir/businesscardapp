const withPWA = require("next-pwa");
/** @type {import('next').NextConfig} */

const nextConfig = withPWA({
  pwa: {
    dest: "public",
    register: true,
    swSrc: 'service-worker.js',
    disable: process.env.NODE_ENV === 'development'
  },
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_AZURE}/:path*`,
      },
    ]
  },
})

module.exports = nextConfig