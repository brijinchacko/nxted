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
import { FaqSection, type FaqItem } from '@/components/seo/FaqSection';
import { DirectAnswer } from '@/components/seo/DirectAnswer';

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

const HOME_FAQ: FaqItem[] = [
  {
    q: 'Where does nxted’s training data come from?',
    a: 'nxted captures egocentric (first-person) demonstration data from verified, consented contributors across India’s skilled trades and professions. Contributors are paid above the local market rate, every site signs a release, and engagements are contracted through OFORO LTD, a UK-registered company, for UK and EU buyers.',
  },
  {
    q: 'What formats do you deliver robotics training data in?',
    a: 'Every nxted Capture dataset ships robotics-ready in LeRobot, RLDS and HDF5, alongside raw and processed egocentric video, third-person reference, full metadata (calibration, 6-DoF trajectories, hand pose), action labels, a dataset card and a QA report - so it drops straight into your training pipeline.',
  },
  {
    q: 'Is nxted data consented and compliant for UK/EU use?',
    a: 'Yes. Every dataset ships with a Data Trust Pack: consent records, a fair-payment confirmation, redaction of faces, plates and PII, a data-provenance log, and a DPDP & GDPR-aligned Data Processing Agreement with UK IDTA or EU SCCs where transfers apply. No contributors under 18.',
  },
  {
    q: 'Who evaluates AI models on nxted Expert?',
    a: 'Credentialed domain experts across engineering, the sciences, medicine, law and finance - not a generalist crowd. Every nxted Expert engagement reports inter-rater agreement and an error taxonomy tied to your deployment risks, with reviewer credentials disclosed per project for full transparency.',
  },
  {
    q: 'How do I get started with nxted?',
    a: 'Request a Physical AI Test Kit (from $2,500: 5-10 usable hours of one skilled task with a consent pack and LeRobot/RLDS/HDF5 sample), or a free Expert Test Kit of 20 evaluated outputs. Both are scoped within 24 hours through the nxted portal.',
  },
];

function DirectAnswerSection() {
  return (
    <section className="section-pad bg-[var(--bg-surface)] border-t border-[var(--border-dim)]">
      <div className="container-site grid md:grid-cols-2 gap-5 max-w-5xl">
        <DirectAnswer question="What is physical AI training data?">
          Physical AI training data is first-person (egocentric) video of people performing real
          manual tasks - with depth, hand pose, 6-DoF trajectories and action labels - used to teach
          robots and embodied AI how to act. Unlike web text or third-person clips, it captures how a
          skilled human actually moves through a task.
        </DirectAnswer>
        <DirectAnswer question="What is nxted?" accent="capture">
          nxted supplies two things to AI labs and robotics teams: egocentric physical-AI capture
          from India&rsquo;s skilled workforce (nxted Capture) and expert human evaluation and RLHF
          (nxted Expert). Every dataset is consented, robotics-ready and ships with a Data Trust
          Pack. nxted is operated by OFORO LTD, a UK company.
        </DirectAnswer>
      </div>
    </section>
  );
}

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
      <DirectAnswerSection />
      <FaqSection items={HOME_FAQ} />
    </>
  );
}
