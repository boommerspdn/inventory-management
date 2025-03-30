import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Prevents Next.js from caching images
    domains: ["localhost"],
  },
  /* config options here */
};

export default nextConfig;
