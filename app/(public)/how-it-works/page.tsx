'use client';

import { Tabs } from '@/components/ui/Tabs';
import { FadeUp } from '@/components/motion/FadeUp';

const EXPERT_STEPS = [
  { n: '01', title: 'Submit brief', body: 'Describe AI domain and what "correct" means.' },
  { n: '02', title: 'Admin assigns contributors', body: 'Within 2 hours on business days.' },
  { n: '03', title: 'Contributors evaluate', body: 'Using Nxted\'s structured interface.' },
  { n: '04', title: 'Metrics calculated', body: 'Inter-rater agreement and accuracy score.' },
  { n: '05', title: 'Report generated', body: 'AI narrative reviewed by admin.' },
  { n: '06', title: 'Report delivered', body: 'Expert credentials, recommendations, optional EU AI Act docs.' },
];

const CAPTURE_STEPS = [
  { n: '01', title: 'Specify dataset', body: 'Skill, level, hours, environment, format.' },
  { n: '02', title: 'Receive quote', body: 'Within 24 hours.' },
  { n: '03', title: 'Confirm and pay deposit', body: '50% deposit, balance on delivery.' },
  { n: '04', title: 'Recording in India', body: 'We coordinate sessions with verified contributors.' },
  { n: '05', title: 'Quality review', body: 'Every batch reviewed before delivery.' },
  { n: '06', title: 'Dataset delivered', body: 'Your format plus consent documentation.' },
];

function StepList({ steps, accent }: { steps: typeof EXPERT_STEPS; accent: 'expert' | 'capture' }) {
  const color = accent === 'expert' ? 'var(--expert)' : 'var(--capture)';
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
      {steps.map((step, i) => (
        <FadeUp key={step.n} delay={i * 0.05}>
          <div
            className="font-bold tracking-[-0.04em] leading-none mb-4"
            style={{ color, fontSize: 'clamp(40px, 3.6vw, 56px)' }}
          >
            {step.n}
          </div>
          <h3 className="text-h4 mb-2">{step.title}</h3>
          <p className="text-sm text-[var(--text-secondary)] max-w-[36ch]">{step.body}</p>
        </FadeUp>
      ))}
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <section className="page-pad">
      <div className="container-site">
        <FadeUp className="max-w-3xl mb-14">
          <div className="text-label mb-5">How it works</div>
          <h1 className="text-h1">
            From <span className="text-[var(--expert)]">brief</span> to <span className="text-[var(--capture)]">delivery</span>.
          </h1>
          <p className="text-body text-[var(--text-secondary)] mt-6 max-w-[58ch]">
            Two products. Two tracks. Same level of transparency on who did the work and how well it went.
          </p>
        </FadeUp>

        <Tabs
          items={[
            { id: 'expert', label: 'Expert track', content: <StepList steps={EXPERT_STEPS} accent="expert" /> },
            { id: 'capture', label: 'Capture track', content: <StepList steps={CAPTURE_STEPS} accent="capture" /> },
          ]}
        />
      </div>
    </section>
  );
}
