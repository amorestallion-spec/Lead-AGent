import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crank AI solutions | Modern AI-Powered Websites for Local Businesses",
  description: "Crank AI Solutions delivers AI-powered websites, voice agents, and lead generation systems that help businesses get more clients on autopilot.",
  keywords: [
    "web development",
    "AI websites",
    "local business websites",
    "website modernization",
    "responsive design",
    "Crank AI",
  ],
  openGraph: {
    title: "Crank AI solutions | AI-Powered Websites",
    description:
      "Modern websites for local businesses, powered by AI. Get your professional online presence in under 48 hours.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a1a] text-[#f0f0f5]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}