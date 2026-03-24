import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@twg/shared"],
  serverExternalPackages: [
    "firebase-admin",
  ],
};

export default nextConfig;
