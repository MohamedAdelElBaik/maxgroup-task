/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { timeout: 10000 } }
    ],
  },
};

module.exports = nextConfig;
