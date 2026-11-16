import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/config";

const PUBLIC_URL = `https://110x.ai${BASE_PATH}`;

const nextConfig: NextConfig = {
  // The site lives at 110x.ai/jacobilicious: 110x.ai forwards that path to this project.
  basePath: BASE_PATH,
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
