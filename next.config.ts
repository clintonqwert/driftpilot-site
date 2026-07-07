import type { NextConfig } from "next";

const httpHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // performance — enables DNS pre-resolution for linked origins
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // /how-we-work was replaced by the six-step /process page (308).
      { source: "/how-we-work", destination: "/process", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: httpHeaders,
      },
    ];
  },
};

export default nextConfig;
