import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@twg/shared"],
  serverExternalPackages: [
    "firebase-admin",
  ],
};

export default nextConfig;
