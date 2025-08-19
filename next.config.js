/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure static export works properly
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure trailing slash for static hosting
  trailingSlash: true,
}

module.exports = nextConfig 