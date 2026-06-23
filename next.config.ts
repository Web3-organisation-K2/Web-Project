import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  distDir: '/tmp/web-project-next', 
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'images.pixabay.com' },
      { protocol: 'https', hostname: 'img.rocket.new' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 100],
  },
};

export default nextConfig;