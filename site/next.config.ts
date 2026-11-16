import type { NextConfig } from "next";
import { BASE_PATH, PUBLIC_HOST, PUBLIC_URL } from "./src/lib/config";

const nextConfig: NextConfig = {
  // The site lives at 110x.ai/jacobilicious: 110x.ai forwards that path to this project.
  basePath: BASE_PATH,
  // Admin sign-in is a server action. Behind the 110x.ai rewrite the browser origin is 110x.ai
  // while the forwarded host is this project, so the CSRF check must accept 110x.ai.
  experimental: { serverActions: { allowedOrigins: [PUBLIC_HOST] } },
  async redirects() {
    return [
      // The rating gate is retired: /zugang now opens the public repo. /admin and /freischalten keep working.
      { source: "/zugang", destination: "https://github.com/scalable-so/jacobilicious", permanent: false },
      // Old addresses without the base path (jacobilicious.vercel.app/...) move to 110x.ai/jacobilicious.
      { source: "/", destination: PUBLIC_URL, basePath: false, permanent: false },
      {
        source: "/:path((?!jacobilicious(?:/|$)).+)",
        destination: `${PUBLIC_URL}/:path`,
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
