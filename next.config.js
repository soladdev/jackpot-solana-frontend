/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arweave.net",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "arweave.net",
        pathname: "**/*.jpg",
      },
      {
        protocol: "https",
        hostname: "statics.solscan.io",
        pathname: "**/*",
      },
    ],
  },
};

module.exports = nextConfig;
