import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@taskflow/ui", "@taskflow/shared"]
};

export default nextConfig;
