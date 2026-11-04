import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },

  async rewrites() {
    return [{ source: "/api/:path*", destination: "https://studiospace-server-alpha.vercel.app/api/:path*" }];
  }

};

export default nextConfig;