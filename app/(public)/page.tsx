import { HeroSection } from '@/components/home/HeroSection';
import { Ticker } from '@/components/motion/Ticker';
import { ProductSplit } from '@/components/home/ProductSplit';
import { MarketData } from '@/components/home/MarketData';
import { CaptureLevels } from '@/components/home/CaptureLevels';
import { CompetitorGap } from '@/components/home/CompetitorGap';
import { IndiaAdvantage } from '@/components/home/IndiaAdvantage';
import { TrustBar } from '@/components/home/TrustBar';
import { CaseStudies } from '@/components/home/CaseStudies';
import { TICKER_ITEMS } from '@/lib/constants';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Physical AI Training Data & RLHF, India | nxted.ai',
  description:
    'nxted supplies egocentric physical-AI training data and expert RLHF evaluation from India - consented, robotics-ready and UK/EU-contracted. By OFORO LTD.',
  path: '/',
  keywords: [
    'physical AI training data',
    'egocentric data for robotics',
    'RLHF data provider',
    'humanoid robot training data',
    'AI training data company UK',
  ],
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Ticker items={TICKER_ITEMS} />
      <ProductSplit />
      <MarketData />
      <CaptureLevels />
      <CompetitorGap />
      <IndiaAdvantage />
      <TrustBar />
      <CaseStudies />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'nxted.ai',
            url: 'https://nxted.ai',
            description:
              'Human Intelligence at Machine Scale - AI training data and physical AI capture from India, by OFORO LTD (UK).',
            parentOrganization: { '@type': 'Organization', name: 'OFORO LTD' },
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Unit 8 Lyon Road',
              addressLocality: 'Milton Keynes',
              postalCode: 'MK1 1EX',
              addressCountry: 'GB',
            },
          }),
        }}
      />
    </>
  );
}
