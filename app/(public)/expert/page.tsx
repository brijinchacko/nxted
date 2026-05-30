import { pageMeta } from '@/lib/seo';
import {
  ArrowRight,
  Upload,
  UsersThree,
  ClipboardText,
  FileText,
} from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/motion/FadeUp';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { EXPERT_PRODUCTS } from '@/lib/constants';

export const metadata = pageMeta({
  title: 'RLHF & Human Evaluation for AI | nxted.ai',
  description:
    'Expert human evaluation, RLHF and red-teaming for AI - credentialed domain reviewers, inter-rater agreement and full quality transparency. From £249.',
  path: '/expert',
  keywords: [
    'RLHF data provider',
    'human evaluation for AI',
    'what is RLHF',
    'AI red-teaming',
    'expert AI evaluation UK',
  ],
});

const STEPS = [
  { n: '01', icon: Upload, title: 'Submit your AI outputs', body: 'Text via secure portal - EU-hosted.' },
  { n: '02', icon: UsersThree, title: 'We assign verified contributors', body: 'Matched on expertise, workload, and score.' },
  { n: '03', icon: ClipboardText, title: 'Experts evaluate against your rubric', body: 'Structured verdict plus free-text correction.' },
  { n: '04', icon: FileText, title: 'Quality report delivered', body: 'With inter-rater agreement and expert credentials.' },
];

const RED_TEAM = [
  {
    label: 'Adversarial Sprint',
    price: '£499 - £2,000',
    body: '50 adversarial prompts crafted by domain experts. Identify failure modes before they reach production.',
  },
  {
    label: 'EU AI Act Compliance Package',
    price: '£2,000 - £8,000',
    body: 'Evaluation plus structured compliance narrative for high-risk system documentation.',
  },
];

export default function ExpertPage() {
  return (
    <>
      <section className="bg-[#0A1616] hero-pad border-b border-[var(--border-dim)]">
        <div className="container-site grid lg:grid-cols-12 gap-12 xl:gap-20 items-center">
          <FadeUp className="lg:col-span-7">
            <div className="text-label mb-5" style={{ color: 'var(--expert)' }}>Nxted Expert</div>
            <h1 className="text-h1 max-w-[18ch]">
              Your AI learns from the <span className="text-[var(--expert)]">people who know it best</span>.
            </h1>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-[52ch]">
              Domain experts across engineering, the sciences, medicine, law and finance evaluate your AI outputs, generate training data, and red-team your models - with full transparency on who reviewed your AI and exactly how accurate they were.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/portal/expert/new?product=TEST_KIT" variant="expert" size="lg">
                Start free test kit
                <ArrowRight size={18} weight="bold" />
              </Button>
              <Button href="/pricing" variant="outline" size="lg">
                See pricing
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.2} className="lg:col-span-5">
            <div className="surface p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-label mb-1">Live quality report</div>
                  <div className="text-sm text-[var(--text-secondary)]">Sample · Industrial AI</div>
                </div>
                <Badge tone="warning">73 / 100</Badge>
              </div>
              <div className="space-y-5">
                <Metric label="Accuracy" value={71} accent="capture" suffix="%" />
                <Metric label="Inter-rater agreement" value={94} accent="success" suffix="%" />
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <MiniStat label="Factual errors" value="12" />
                  <MiniStat label="Domain errors" value="8" />
                </div>
                <p className="text-xs text-[var(--text-tertiary)] pt-4 border-t border-[var(--border-dim)]">
                  2 CE-verified domain engineers · 4.8/5 contributor score
                </p>
              </div>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] mt-4 italic">
              Full transparency on every batch - the score, the breakdown, and who produced it.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <FadeUp className="max-w-2xl mb-14">
            <div className="text-label mb-5">How it works</div>
            <h2 className="text-h2">
              Four steps from brief to <span className="text-[var(--expert)]">quality report</span>.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeUp key={step.n} delay={i * 0.08}>
                  <article className="surface surface-hover p-6 h-full flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-lg bg-[var(--expert-dim)] flex items-center justify-center">
                        <Icon size={22} weight="duotone" style={{ color: 'var(--expert)' }} />
                      </div>
                      <span className="text-sm font-semibold tracking-tight text-[var(--text-tertiary)]">{step.n}</span>
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
        </div>
      </section>

      <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)]">
        <div className="container-site">
          <FadeUp className="max-w-2xl mb-12">
            <div className="text-label mb-5">Products</div>
            <h2 className="text-h2">
              From <span className="text-[var(--expert)]">free test</span> to fully managed retainer.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <PricingCard
              label="Free Test Kit"
              price="£0"
              meta="No card needed"
              bullets={['20 outputs', 'Quality score report', '48-hour delivery']}
              cta={{ label: 'Get test kit', href: '/portal/expert/new?product=TEST_KIT', variant: 'outline' }}
            />
            <PricingCard
              accent
              label={EXPERT_PRODUCTS[0].label}
              price={EXPERT_PRODUCTS[0].price}
              meta={EXPERT_PRODUCTS[0].turnaround}
              bullets={[EXPERT_PRODUCTS[0].outputs, EXPERT_PRODUCTS[0].description]}
              cta={{ label: 'Buy sprint', href: `/portal/expert/new?product=${EXPERT_PRODUCTS[0].key}`, variant: 'expert' }}
            />
            <PricingCard
              label="Retainer plans"
              price="From £1,500"
              meta="per month"
              bullets={['Ongoing evaluation', 'Quality dashboard', 'Dedicated coordinator at Growth+']}
              cta={{ label: 'See retainer tiers', href: '/pricing#retainers', variant: 'outline' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {EXPERT_PRODUCTS.slice(1).map((p) => (
              <PricingCard
                key={p.key}
                accent
                label={p.label}
                price={p.price}
                meta={p.outputs}
                bullets={[p.description]}
                cta={{ label: 'Start retainer', href: `/portal/expert/new?product=${p.key}`, variant: 'expert' }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <FadeUp className="max-w-2xl mb-12">
            <div className="text-label mb-5">Specialist engagements</div>
            <h2 className="text-h2">For red-teaming and <span className="text-[var(--capture)]">EU AI Act compliance</span>.</h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-5">
            {RED_TEAM.map((r) => (
              <FadeUp key={r.label}>
                <article className="surface p-8 h-full flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-h3">{r.label}</h3>
                    <Badge tone="capture">{r.price}</Badge>
                  </div>
                  <p className="text-[var(--text-secondary)]">{r.body}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Metric({ label, value, accent, suffix = '' }: { label: string; value: number; accent: 'expert' | 'capture' | 'success'; suffix?: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-[var(--text-secondary)]">{label}</span>
        <span className="text-[var(--text-primary)] font-medium">{value}{suffix}</span>
      </div>
      <Progress value={value} accent={accent} />
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[var(--border-dim)] rounded-lg p-3.5">
      <div className="text-[10px] tracking-wider uppercase text-[var(--text-tertiary)] mb-1">{label}</div>
      <div className="text-[var(--text-primary)] font-semibold">{value}</div>
    </div>
  );
}

function PricingCard({
  label,
  price,
  meta,
  bullets,
  cta,
  accent,
}: {
  label: string;
  price: string;
  meta: string;
  bullets: string[];
  cta: { label: string; href: string; variant: 'expert' | 'outline' };
  accent?: boolean;
}) {
  return (
    <FadeUp className="h-full">
      <Card accent={accent ? 'expert' : undefined} className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{label}</CardTitle>
        </CardHeader>
        <CardBody className="flex flex-col flex-1">
          <p className="text-[var(--text-primary)] text-3xl font-semibold mb-1">{price}</p>
          <p className="text-xs text-[var(--text-tertiary)] mb-5">{meta}</p>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)] mb-6">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-[var(--expert)] shrink-0">›</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <Button href={cta.href} variant={cta.variant} size="sm" fullWidth>
              {cta.label}
            </Button>
          </div>
        </CardBody>
      </Card>
    </FadeUp>
  );
}
