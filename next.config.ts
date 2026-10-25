import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // No experimental.inlineCss: inlining ~128 KB of CSS pushed the Open Graph tags so far
  // down the HTML that WhatsApp and other link-preview crawlers never reached them.
  // MDX content is read from disk at build time; make sure it ships with
  // any server function that might need it.
  outputFileTracingIncludes: {
    "/blog/**": ["./src/content/blog/**/*"],
    "/courses/**": ["./src/content/courses/**/*"],
    "/legal/**": ["./src/content/legal/**/*"],
    "/og": ["./src/assets/fonts/**/*", "./public/images/daniel-makonor.jpg"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
