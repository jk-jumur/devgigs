/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // যেকোনো ডোমেইনের ইমেজ অ্যালাউ করবে
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
