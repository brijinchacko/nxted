import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { BetaBanner } from "@/components/branding/beta-banner";
import "./globals.css";

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
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400..800&family=DM+Sans:wght@100..1000&family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-nxted-bg text-nxted-dark antialiased">
        <BetaBanner />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
