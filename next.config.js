/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.google.com', 'lh3.googleusercontent.com'], // Allow Google profile images
  },
  // Add experimental features to handle file system permissions
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
  // Disable file system trace in development
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/.next/**']
      };
    }
    return config;
  }
}

module.exports = nextConfig 