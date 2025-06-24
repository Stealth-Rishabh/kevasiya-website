/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "kevasiya.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
