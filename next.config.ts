import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["ibb.co", "i.ibb.co"]
  }
};

export default nextConfig;
