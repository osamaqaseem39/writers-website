/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard Next.js configuration for Vercel deployment
  // Remove static export config to let Vercel handle the build
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'http://localhost:5000'
  }
}

module.exports = nextConfig 