/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  outputFileTracingRoot: "C:\\Users\\Admin\\Documents\\final-ladakh\\SGP-Project-II\\frontend",
  distDir: '.next'
};

export default nextConfig;