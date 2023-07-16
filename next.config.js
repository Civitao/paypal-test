/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['unsplash.com', 'images.unsplash.com', 'source.unsplash.com'],
},
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'https://api-m.sandbox.paypal.com/:path*',
    },
  ]
},
}

module.exports = nextConfig
