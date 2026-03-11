import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ajar-server.hostdonor.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ajar-server.hostdonor.com",
        pathname: "/chat/**",
      },
      {
        protocol: "https",
        hostname: "server.ajarhub.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "server.ajarhub.com",
        pathname: "/chat/**",
      },
      {
        protocol: "https",
        hostname: "server.ajarhub.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      }
    ],
  },
};

export default withNextIntl(nextConfig);