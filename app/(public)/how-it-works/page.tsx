'use client';

import {
  ClipboardText,
  UsersThree,
  Eye,
  ChartBar,
  Sparkle,
  FileText,
  Receipt,
  Wallet,
  VideoCamera,
  Shield,
  Truck,
} from '@phosphor-icons/react/dist/ssr';
import { Tabs } from '@/components/ui/Tabs';
import { FadeUp } from '@/components/motion/FadeUp';

type Step = { n: string; title: string; body: string; icon: React.ElementType };

const EXPERT_STEPS: Step[] = [
  { n: '01', icon: ClipboardText, title: 'Submit brief', body: 'Describe AI domain and what "correct" means.' },
  { n: '02', icon: UsersThree, title: 'Admin assigns contributors', body: 'Within 2 hours on business days.' },
  { n: '03', icon: Eye, title: 'Contributors evaluate', body: 'Using Nxted\'s structured interface.' },
  { n: '04', icon: ChartBar, title: 'Metrics calculated', body: 'Inter-rater agreement and accuracy score.' },
  { n: '05', icon: Sparkle, title: 'Report generated', body: 'AI narrative reviewed by admin.' },
  { n: '06', icon: FileText, title: 'Report delivered', body: 'Expert credentials, recommendations, optional EU AI Act docs.' },
];

const CAPTURE_STEPS: Step[] = [
  { n: '01', icon: ClipboardText, title: 'Specify dataset', body: 'Skill, level, hours, environment, format.' },
  { n: '02', icon: Receipt, title: 'Receive quote', body: 'Within 24 hours.' },
  { n: '03', icon: Wallet, title: 'Confirm and pay deposit', body: '50% deposit, balance on delivery.' },
  { n: '04', icon: VideoCamera, title: 'Recording in India', body: 'We coordinate sessions with verified contributors.' },
  { n: '05', icon: Shield, title: 'Quality review', body: 'Every batch reviewed before delivery.' },
  { n: '06', icon: Truck, title: 'Dataset delivered', body: 'Your format plus consent documentation.' },
];

function StepGrid({ steps, accent }: { steps: Step[]; accent: 'expert' | 'capture' }) {
  const color = accent === 'expert' ? 'var(--expert)' : 'var(--capture)';
  const bg = accent === 'expert' ? 'var(--expert-dim)' : 'var(--capture-dim)';
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <FadeUp key={step.n} delay={i * 0.05}>
            <article className="surface surface-hover p-6 h-full flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ background: bg }}
                >
                  <Icon size={22} weight="duotone" style={{ color }} />
                </div>
                <span className="text-sm font-semibold text-[var(--text-tertiary)]">{step.n}</span>
              </div>
              <div>
                <h3 className="text-h4 mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{step.body}</p>
              </div>
            </article>
          </FadeUp>
        );
      })}
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
            { id: 'expert', label: 'Expert track', content: <StepGrid steps={EXPERT_STEPS} accent="expert" /> },
            { id: 'capture', label: 'Capture track', content: <StepGrid steps={CAPTURE_STEPS} accent="capture" /> },
          ]}
        />
      </div>
    </section>
  );
}
