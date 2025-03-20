/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.google.com', 'lh3.googleusercontent.com'], // Allow Google profile images
  },
}

module.exports = nextConfig 