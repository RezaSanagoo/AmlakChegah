/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ❌ اجازه بده build حتی اگه ارور تایپ هست انجام بشه
    ignoreBuildErrors: true,
  },
  eslint: {
    // ❌ ارورهای ESLint رو هم نادیده بگیر
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
