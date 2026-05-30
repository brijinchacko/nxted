import type { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import { JsonLd } from '@/components/seo/JsonLd';
import { ChunkReload } from '@/components/ChunkReload';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import './globals.css';

// Baloo 2 - the logo + heading font (rounded display)
const logoFont = Baloo_2({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-logo',
  display: 'swap',
});

// Nunito - body font. Soft rounded terminals echo the logo, but it's a
// proper text face built for readable paragraphs.
const bodyFont = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const verification: Metadata['verification'] = {};
if (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) {
  verification.google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
}
if (process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION) {
  verification.other = { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION };
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://nxted.ai'),
  title: {
    default: 'Physical AI Training Data & RLHF, India | nxted.ai',
    template: '%s | nxted.ai',
  },
  description:
    'nxted supplies egocentric physical-AI training data and expert RLHF evaluation from India - consented, robotics-ready and UK/EU-contracted. By OFORO LTD.',
  applicationName: 'nxted.ai',
  authors: [{ name: 'OFORO LTD' }],
  creator: 'OFORO LTD',
  publisher: 'OFORO LTD',
  keywords: [
    'physical AI training data',
    'egocentric data for robotics',
    'embodied AI data',
    'robot manipulation dataset',
    'RLHF data provider',
    'human evaluation for AI',
    'humanoid robot training data',
    'AI training data company UK',
    'consented AI training data',
  ],
  openGraph: {
    type: 'website',
    title: 'Physical AI Training Data & RLHF, India | nxted.ai',
    description:
      'Egocentric physical-AI capture and expert RLHF evaluation from India - consented, robotics-ready, UK/EU-contracted. By OFORO LTD.',
    siteName: 'nxted.ai',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Physical AI Training Data & RLHF, India | nxted.ai',
    description:
      'Egocentric physical-AI data and expert RLHF evaluation from India. Consented, robotics-ready, UK/EU-contracted.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  ...(Object.keys(verification).length ? { verification } : {}),
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-MB83TD2F70';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${logoFont.variable} ${bodyFont.variable}`}>
      <body>
        <ChunkReload />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px',
              fontSize: '14px',
            },
          }}
        />

        {/* Google Analytics (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
