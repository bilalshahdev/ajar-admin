import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "react-photo-view/dist/react-photo-view.css";
import "./globals.css";

import ResponseError from "@/components/ResponseError";
import Providers from "@/components/providers/Provider";
import { baseUrl } from "@/config/constants";
import getDirection from "@/utils/getDirection";
import AuthGuard from "./(site)/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ajar",
  description: "Ajar - Rent anything you need",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const dir = getDirection(locale);

  let isServerConnected = false;
  let error: string | null = null;

  if (!baseUrl) {
    error = "❌ No Base URL provided.";
  } else {
    try {
      const res = await fetch(baseUrl, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        if (res.status === 404) {
          error = "❌ Invalid server URL";
        } else {
          error = `❌ Server responded with status ${res.status}`;
        }
      } else {
        isServerConnected = true;
      }
    } catch (e) {
      error = "❌ Could not connect to server";
    }
  }

  return (
    <html dir={dir} lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary`}
      >
        {error ? (
          <ResponseError className="h-screen" error={error} />
        ) : (
          <Providers>
            <AuthGuard>
              <main>{children}</main>
            </AuthGuard>
          </Providers>
        )}
      </body>
    </html>
  );
}
