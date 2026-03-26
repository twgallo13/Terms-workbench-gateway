import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.resolve(__dirname, "../../"),
  transpilePackages: ["@twg/shared"],
  serverExternalPackages: [
    "firebase-admin",
  ],
};

export default nextConfig;
