import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "nxtED AI — Learn Anything in 15 Minutes a Day",
    template: "%s | nxtED AI",
  },
  description:
    "AI-powered daily microlearning platform. Learn anything in 15 minutes a day with personalized lessons, AI tutoring, and spaced repetition.",
  authors: [{ name: "OFORO AI", url: "https://oforo.ai" }],
  keywords: [
    "microlearning",
    "AI tutor",
    "online learning",
    "nxtED",
    "OFORO AI",
    "spaced repetition",
  ],
  openGraph: {
    title: "nxtED AI — Learn Anything in 15 Minutes a Day",
    description:
      "AI-powered daily microlearning. Personalized lessons, AI tutoring, and spaced repetition.",
    url: "https://nxted.ai",
    siteName: "nxtED AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-nxted-bg text-nxted-dark antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
