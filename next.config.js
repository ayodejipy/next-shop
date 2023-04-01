/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'cdn.sanity.io', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
