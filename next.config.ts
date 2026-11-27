import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** Domaine principal (sans www) : la version www.<domaine> y est redirigée de façon permanente. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteHost = siteUrl ? new URL(siteUrl).host : null;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    // Photos envoyées depuis le portail /admin (réduites à ~2 Mo par le navigateur avant l'envoi).
    serverActions: { bodySizeLimit: "9mb" },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 128, 160, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    if (!siteHost || siteHost.startsWith("www.") || siteHost.startsWith("localhost")) return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${siteHost}` }],
        destination: `${siteUrl!.replace(/\/+$/, "")}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
