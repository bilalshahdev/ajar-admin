import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.example.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "ajar-server.hostdonor.com",
      },
      {
        protocol: "http",
        hostname: "192.168.18.64",
        port: "5000",
      },
      {
        protocol: "http",
        hostname: "192.168.18.145",
        port: "5000",
      },
      {
        protocol: "http",
        hostname: "192.168.18.64",
        port: "5000",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
