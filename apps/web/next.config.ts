import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
  transpilePackages: ["@twg/shared"],
  serverExternalPackages: [
    "firebase-admin",
  ],
};

export default nextConfig;
