'use client';

import { Tabs } from '@/components/ui/Tabs';
import { FadeUp } from '@/components/motion/FadeUp';

const EXPERT_STEPS = [
  { n: '01', title: 'Submit brief', body: 'Describe AI domain + what "correct" means.' },
  { n: '02', title: 'Admin assigns contributors', body: 'Within 2 hours, business days.' },
  { n: '03', title: 'Contributors evaluate', body: 'Using Nxted\'s structured interface.' },
  { n: '04', title: 'Quality metrics calculated', body: 'Inter-rater agreement, accuracy score.' },
  { n: '05', title: 'Report generated', body: 'AI narrative reviewed by admin.' },
  { n: '06', title: 'Report delivered', body: 'Expert credentials, recommendations, optional EU AI Act docs.' },
];

const CAPTURE_STEPS = [
  { n: '01', title: 'Specify dataset', body: 'Skill category, level, hours, environment, format.' },
  { n: '02', title: 'Receive quote', body: 'Within 24 hours.' },
  { n: '03', title: 'Confirm and pay deposit', body: '50% deposit, balance on delivery.' },
  { n: '04', title: 'Recording in India', body: 'Nxted coordinates sessions with verified contributors.' },
  { n: '05', title: 'Quality review', body: 'Every batch reviewed before delivery.' },
  { n: '06', title: 'Dataset delivered', body: 'Your chosen format + consent documentation.' },
];

function StepList({ steps, accent }: { steps: typeof EXPERT_STEPS; accent: 'expert' | 'capture' }) {
  const color = accent === 'expert' ? 'var(--expert)' : 'var(--capture)';
  return (
    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
      {steps.map((step, i) => (
        <FadeUp key={step.n} delay={i * 0.05} className="flex gap-6">
          <div className="text-[56px] font-bold tracking-[-0.04em] leading-none shrink-0" style={{ color }}>
            {step.n}
          </div>
          <div>
            <h3 className="text-h4 mb-2">{step.title}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{step.body}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <section className="pt-[140px] pb-[120px]">
      <div className="container-site">
        <div className="max-w-3xl mb-12">
          <div className="text-label text-[var(--text-secondary)] mb-4">How It Works</div>
          <h1 className="text-h1">From <span className="text-[var(--expert)]">brief</span> to <span className="text-[var(--capture)]">delivery</span>.</h1>
        </div>

        <Tabs
          items={[
            { id: 'expert', label: 'Expert Track', content: <StepList steps={EXPERT_STEPS} accent="expert" /> },
            { id: 'capture', label: 'Capture Track', content: <StepList steps={CAPTURE_STEPS} accent="capture" /> },
          ]}
        />
      </div>
    </section>
  );
}
