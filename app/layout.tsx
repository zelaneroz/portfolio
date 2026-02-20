import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zelan Eroz Espanto",
  description: "Zelan Eroz Espanto's Portoflio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`cursor-none ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CustomCursor/>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
