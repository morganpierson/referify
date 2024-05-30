/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asset.brandfetch.io',
        port: '',
        pathname: '/search/icon/**',
      },
    ],
  },
}

module.exports = nextConfig
