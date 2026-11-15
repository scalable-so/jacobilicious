import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The rating gate is retired: /zugang now opens the public repo. /admin and /freischalten keep working.
  async redirects() {
    return [{ source: "/zugang", destination: "https://github.com/scalable-so/jacobilicious", permanent: false }];
  },
};

export default nextConfig;
