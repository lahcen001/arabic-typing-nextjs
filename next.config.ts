import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  optimizeFonts: true,
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons']
  }
};

export default nextConfig;
