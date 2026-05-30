import { pageMeta } from '@/lib/seo';
import { FadeUp } from '@/components/motion/FadeUp';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { CaseStudyGraphic } from '@/components/graphics/Infographics';

export const metadata = pageMeta({
  title: 'Physical AI & RLHF Case Studies | nxted.ai',
  description:
    'How AI labs, robotics teams and EU compliance teams use nxted Expert and nxted Capture in production - anonymised, measurable engagements.',
  path: '/case-studies',
  keywords: [
    'robotics training data case studies',
    'physical AI data provider',
    'RLHF case study',
  ],
});

interface CaseStudy {
  product: 'Expert' | 'Capture' | 'Both';
  tag: string;
  client: string;
  industry: string;
  image: string;
  challenge: string;
  approach: string[];
  results: { label: string; value: string }[];
  quote: { text: string; role: string };
  meta: { duration: string; team: string; scope: string };
}

const STUDIES: CaseStudy[] = [
  {
    product: 'Expert',
    tag: 'Industrial AI · Predictive maintenance',
    client: 'UK Industrial AI Company',
    industry: 'Heavy industry',
    image:
      'https://images.unsplash.com/photo-1565514020179-026b92b2d70b?w=1600&h=900&fit=crop',
    challenge:
      'A vibration-sensor predictive maintenance model was misdiagnosing bearing failures 32% of the time. The team needed deep-domain evaluation faster than their incumbent could deliver - and without GDPR exposure.',
    approach: [
      'Assigned 50 verified mechanical engineers across three plants worth of failure-mode data.',
      'Built a 9-axis rubric covering bearing modes, lubrication faults, mounting errors, and combined-mode failures.',
      'Delivered inter-rater agreement reports with every batch - surfacing controversial outputs for re-evaluation.',
    ],
    results: [
      { label: 'Accuracy', value: '68% → 91%' },
      { label: 'Time to onboard', value: '72 hours' },
      { label: 'Engagement length', value: '8 weeks' },
    ],
    quote: {
      text: '"Our previous vendor couldn\'t give us a signed DPA. Nxted onboarded us in 72 hours with one in place."',
      role: 'Head of ML, UK industrial AI company',
    },
    meta: { duration: '8 weeks', team: '50 engineers', scope: '500 outputs' },
  },
  {
    product: 'Capture',
    tag: 'Physical AI · Humanoid manipulation',
    client: 'US Humanoid Robot Company',
    industry: 'Humanoid robotics',
    image:
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&h=900&fit=crop',
    challenge:
      'A humanoid robot company needed 1,000 hours of garment-making footage covering 60 distinct task variations - at a unit cost the US market couldn\'t deliver.',
    approach: [
      'Recruited 200 professional tailors across Tirupur and Bengaluru garment districts.',
      'Captured egocentric Project Aria footage with hand-pose annotations and action labels.',
      'Delivered in robotics-ready RLDS format with full consent documentation.',
    ],
    results: [
      { label: 'Hours captured', value: '1,000h' },
      { label: 'Cost vs US benchmark', value: '-82%' },
      { label: 'Lead time', value: '6 weeks' },
    ],
    quote: {
      text: '"We had no idea India had this calibre of skilled workers available for capture. Nxted is now our default supplier."',
      role: 'VP Data, US humanoid robotics company',
    },
    meta: { duration: '6 weeks', team: '200 tailors', scope: '1,000 hours' },
  },
  {
    product: 'Both',
    tag: 'Healthcare AI · Surgical assistance',
    client: 'EU AI Research Lab',
    industry: 'Medical AI',
    image:
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1600&h=900&fit=crop',
    challenge:
      'A surgical-assistance AI required both expert text evaluation of clinical reasoning AND egocentric video of procedure-adjacent tasks. The lab wanted a single supplier across both modalities with full EU AI Act documentation.',
    approach: [
      'Expert module: qualified doctors evaluated 300 model outputs against a 12-axis surgical rubric.',
      'Capture module: 150 hours of instrument-handoff and patient-prep footage with consent + ethics committee approval.',
      'Unified delivery with one DPA, one contract, one invoice - and an EU AI Act compliance narrative.',
    ],
    results: [
      { label: 'Domains served', value: 'Text + Physical' },
      { label: 'Total deliverables', value: '300 outputs + 150h' },
      { label: 'Compliance', value: 'EU AI Act Annex IV' },
    ],
    quote: {
      text: '"Full pipeline served by one platform. The compliance narrative alone saved us six weeks of legal work."',
      role: 'Director of AI Safety, EU research lab',
    },
    meta: { duration: '10 weeks', team: '15 doctors · 35 nurses', scope: '300 outputs · 150h video' },
  },
];

export default function CaseStudiesPage() {
  return (
    <section className="page-pad">
      <div className="container-site">
        <div className="max-w-3xl mb-16">
          <div className="text-label mb-5">Case studies</div>
          <h1 className="text-h1">
            What happens when the right humans <span className="text-[var(--expert)]">train the right AI</span>.
          </h1>
          <p className="text-body text-[var(--text-secondary)] mt-6 max-w-[58ch]">
            Three production deployments across industrial AI, humanoid robotics, and medical AI. All anonymised. All measurable.
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {STUDIES.map((s, i) => (
            <CaseStudyCard key={i} study={s} reversed={i % 2 === 1} />
          ))}
        </div>

        <div className="surface mt-20 p-10 md:p-14 text-center">
          <h2 className="text-h2 mb-4 max-w-[24ch] mx-auto">
            Want your engagement to <span className="text-[var(--expert)]">read like one of these</span>?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-[52ch] mx-auto mb-8">
            Start with a free 20-output test kit, or request a custom capture quote within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/portal/expert/new?product=TEST_KIT" variant="expert" size="lg">
              Start free test kit <ArrowRight size={18} weight="bold" />
            </Button>
            <Button href="/portal/capture/new" variant="capture" size="lg">
              Request capture quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ study, reversed }: { study: CaseStudy; reversed?: boolean }) {
  const accent = study.product === 'Capture' ? 'capture' : 'expert';
  const accentColor = accent === 'capture' ? 'var(--capture)' : 'var(--expert)';
  const graphicVariant = study.product === 'Capture' ? 'capture' : study.product === 'Both' ? 'both' : 'expert';
  return (
    <FadeUp>
      <article className="surface overflow-hidden">
        <div className={`grid lg:grid-cols-12 gap-0 ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`lg:col-span-5 relative min-h-[280px] lg:min-h-[480px] flex items-center bg-[var(--bg-surface)] border-b lg:border-b-0 lg:border-r border-[var(--border-dim)] p-6 ${reversed ? 'lg:order-2' : ''}`}>
            <div className="w-full">
              <CaseStudyGraphic variant={graphicVariant} />
            </div>
            <div className="absolute bottom-0 inset-x-0 p-6">
              <Badge tone={accent}>Nxted {study.product}</Badge>
              <div className="text-[11px] tracking-[0.18em] uppercase text-[var(--text-secondary)] mt-3">{study.tag}</div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 md:p-10 lg:p-12 flex flex-col gap-6">
            <div>
              <h3 className="text-h2">
                {study.client}{' '}
                <span className="text-[var(--text-tertiary)] text-base font-normal">anonymous</span>
              </h3>
              <div className="text-xs text-[var(--text-tertiary)] mt-2 tracking-wider uppercase">{study.industry}</div>
            </div>

            <div>
              <div className="text-label mb-2">Challenge</div>
              <p className="text-[var(--text-secondary)]">{study.challenge}</p>
            </div>

            <div>
              <div className="text-label mb-3">What Nxted did</div>
              <ul className="space-y-2.5">
                {study.approach.map((a) => (
                  <li key={a} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                    <CheckCircle size={18} weight="fill" style={{ color: accentColor }} className="shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-[var(--border-dim)] pt-6">
              {study.results.map((r) => (
                <div key={r.label}>
                  <div className="text-[10px] tracking-[0.14em] uppercase text-[var(--text-tertiary)] mb-1">{r.label}</div>
                  <div className="text-xl font-semibold text-[var(--text-primary)]">{r.value}</div>
                </div>
              ))}
            </div>

            <blockquote className="border-l-2 pl-5 mt-2" style={{ borderColor: accentColor }}>
              <p className="text-[var(--text-primary)] italic">{study.quote.text}</p>
              <footer className="text-xs text-[var(--text-tertiary)] mt-2">- {study.quote.role}</footer>
            </blockquote>

            <div className="grid grid-cols-3 gap-3 text-xs border-t border-[var(--border-dim)] pt-5">
              <Meta label="Duration" value={study.meta.duration} />
              <Meta label="Team" value={study.meta.team} />
              <Meta label="Scope" value={study.meta.scope} />
            </div>
          </div>
        </div>
      </article>
    </FadeUp>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.14em] uppercase text-[var(--text-tertiary)] mb-1">{label}</div>
      <div className="text-[var(--text-secondary)]">{value}</div>
    </div>
  );
}
