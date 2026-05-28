import type { Metadata } from 'next';
import { FadeUp } from '@/components/motion/FadeUp';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { EXPERT_PRODUCTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Nxted Expert — RLHF, AI evaluation, red-teaming',
  description:
    'India\'s IIT engineers, AIIMS doctors, IIM consultants and ILS lawyers evaluate your AI outputs with full quality transparency. From £249.',
};

const STEPS = [
  { n: '01', title: 'Submit your AI outputs', body: 'Text, via secure portal — EU-hosted.' },
  { n: '02', title: 'We assign 2–3 verified domain contributors', body: 'Matched on expertise + workload + score.' },
  { n: '03', title: 'Experts evaluate each output against your rubric', body: 'Structured rubric + free-text correction.' },
  { n: '04', title: 'Quality report delivered', body: 'With inter-rater agreement score and an expert panel disclosure.' },
];

const RED_TEAM = [
  { label: 'Adversarial Sprint', price: '£499 – £2,000', body: '50 adversarial prompts crafted by domain experts.' },
  { label: 'EU AI Act Compliance Package', price: '£2,000 – £8,000', body: 'Evaluation + structured compliance narrative for high-risk system documentation.' },
];

export default function ExpertPage() {
  return (
    <>
      <section className="bg-[#0A1616] pt-[160px] pb-[100px] border-b border-[var(--border-dim)]">
        <div className="container-site grid lg:grid-cols-12 gap-12 items-center">
          <FadeUp className="lg:col-span-7">
            <div className="text-label text-[var(--expert)] mb-4">Nxted Expert</div>
            <h1 className="text-h1">
              Your AI learns from the <span className="text-[var(--expert)]">people who know it best</span>.
            </h1>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-xl">
              India's IIT engineers, AIIMS doctors, and IIM consultants evaluate your AI outputs, generate training data, and red-team your models — with full transparency on who reviewed your AI and exactly how accurate they were.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/portal/expert/new?product=TEST_KIT" variant="expert">
                Start Free Test Kit
              </Button>
              <Button href="/pricing" variant="outline">
                See Pricing
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.2} className="lg:col-span-5">
            <Card className="bg-[var(--bg-card)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Live Quality Report (sample)</CardTitle>
                  <Badge tone="warning">73 / 100</Badge>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy</span>
                      <span className="text-[var(--text-muted)]">71%</span>
                    </div>
                    <Progress value={71} accent="capture" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Inter-rater agreement</span>
                      <span className="text-[var(--text-muted)]">94%</span>
                    </div>
                    <Progress value={94} accent="success" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="border border-[var(--border-dim)] rounded-md p-3">
                      <div className="text-[var(--text-muted)] uppercase tracking-wider">Factual</div>
                      <div className="text-[var(--text-primary)] font-medium mt-1">12 issues</div>
                    </div>
                    <div className="border border-[var(--border-dim)] rounded-md p-3">
                      <div className="text-[var(--text-muted)] uppercase tracking-wider">Domain</div>
                      <div className="text-[var(--text-primary)] font-medium mt-1">8 issues</div>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-dim)]">
                    2 CE-verified IIT engineers · 4.8/5 contributor score
                  </p>
                </div>
              </CardBody>
            </Card>
            <p className="text-xs text-[var(--text-muted)] mt-3 italic">
              This is what Mercor won't show you. We show you everything.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <FadeUp>
            <div className="text-label text-[var(--text-secondary)] mb-4">How it works</div>
            <h2 className="text-h2 max-w-2xl mb-12">Four steps from brief to <span className="text-[var(--expert)]">quality report</span>.</h2>
          </FadeUp>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.08}>
                <div>
                  <div className="text-[64px] font-bold tracking-[-0.04em] text-[var(--expert)] leading-none mb-3">
                    {step.n}
                  </div>
                  <h3 className="text-h4 mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{step.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)]">
        <div className="container-site">
          <FadeUp className="mb-12">
            <div className="text-label text-[var(--text-secondary)] mb-4">Products</div>
            <h2 className="text-h2 max-w-2xl">From <span className="text-[var(--expert)]">free test</span> to fully managed retainer.</h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Free Test Kit</CardTitle>
              </CardHeader>
              <CardBody>
                <p className="text-[var(--text-primary)] text-2xl font-semibold mb-1">£0</p>
                <p className="text-xs text-[var(--text-muted)] mb-4">No card needed</p>
                <ul className="space-y-1.5 text-sm text-[var(--text-secondary)] mb-5">
                  <li>20 outputs</li>
                  <li>Quality score report</li>
                  <li>48-hour delivery</li>
                </ul>
                <Button href="/portal/expert/new?product=TEST_KIT" variant="outline" size="sm" fullWidth>
                  Get Test Kit
                </Button>
              </CardBody>
            </Card>
            {EXPERT_PRODUCTS.map((p) => (
              <Card key={p.key} accent="expert" hoverable>
                <CardHeader>
                  <CardTitle>{p.label}</CardTitle>
                </CardHeader>
                <CardBody>
                  <p className="text-[var(--text-primary)] text-2xl font-semibold mb-1">{p.price}</p>
                  <p className="text-xs text-[var(--text-muted)] mb-4">{p.turnaround}</p>
                  <ul className="space-y-1.5 text-sm text-[var(--text-secondary)] mb-5">
                    <li>{p.outputs}</li>
                    <li>{p.description}</li>
                  </ul>
                  <Button href={`/portal/expert/new?product=${p.key}`} variant="expert" size="sm" fullWidth>
                    {p.mode === 'payment' ? 'Buy Sprint' : 'Start retainer'}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>

          <FadeUp className="mt-10 grid md:grid-cols-2 gap-4">
            {RED_TEAM.map((r) => (
              <Card key={r.label} accent="capture">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>{r.label}</CardTitle>
                  <Badge tone="capture">{r.price}</Badge>
                </div>
                <CardBody>{r.body}</CardBody>
              </Card>
            ))}
          </FadeUp>
        </div>
      </section>
    </>
  );
}
