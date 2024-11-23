import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co'],
    unoptimized: true
  }
};

export default nextConfig;
