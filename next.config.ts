import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // 👈 這行讓 build 忽略 ESLint 錯誤
  },
};

export default nextConfig;
