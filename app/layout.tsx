import type { Metadata } from 'next';
import { Space_Grotesk, Comfortaa } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// Monoline geometric rounded sans for the logo wordmark — matches the
// rounded, uniform-stroke construction of the monogram mark
const logoFont = Comfortaa({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-logo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'nxted.ai — Human Intelligence at Machine Scale',
    template: '%s | nxted.ai',
  },
  description:
    'The platform where India\'s brightest minds train the world\'s most advanced AI systems — text and physical. Nxted Expert + Nxted Capture. By OFORO LTD, UK.',
  keywords: [
    'AI training data India',
    'RLHF platform',
    'physical AI training data',
    'egocentric video collection India',
    'humanoid robot training data',
    'Mercor alternative UK',
    'embodied AI dataset',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://nxted.ai'),
  openGraph: {
    type: 'website',
    title: 'nxted.ai — Human Intelligence at Machine Scale',
    description:
      'Two products. One mission. Nxted Expert evaluates your AI. Nxted Capture records human skills for robotics.',
    siteName: 'nxted.ai',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nxted.ai — Human Intelligence at Machine Scale',
    description:
      'India-first training data for AI labs and humanoid robot companies. By OFORO LTD.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${logoFont.variable}`}>
      <body>
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
      </body>
    </html>
  );
}
