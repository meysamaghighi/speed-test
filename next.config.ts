import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/daily",
        destination: "/brain-age",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
