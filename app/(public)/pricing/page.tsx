import { pageMeta } from '@/lib/seo';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/motion/FadeUp';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EXPERT_PRODUCTS } from '@/lib/constants';

export const metadata = pageMeta({
  title: 'Robotics Training Data Pricing | nxted.ai',
  description:
    'Transparent pricing for physical-AI capture and expert AI evaluation - Physical AI Test Kit from $2,500, per-hour capture tiers and GBP/USD/EUR billing.',
  path: '/pricing',
  keywords: [
    'robotics training data pricing',
    'buy robot manipulation data',
    'physical AI data provider',
    'what robot training data costs',
  ],
});

export default function PricingPage() {
  return (
    <section className="page-pad">
      <div className="container-site">
        <FadeUp className="max-w-3xl mb-16">
          <div className="text-label mb-5">Pricing</div>
          <h1 className="text-h1">
            Transparent, in <span className="text-[var(--expert)]">GBP / USD / EUR</span>.
          </h1>
          <p className="text-body text-[var(--text-secondary)] mt-6 max-w-[58ch]">
            No minimum commitments. No referral gates. Self-serve checkout on Expert sprints, quote-based for Capture.
          </p>
        </FadeUp>

        <div className="mb-20">
          <div className="text-label mb-7" style={{ color: 'var(--expert)' }}>Nxted Expert</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <PriceCard
              title="Free Expert Test Kit"
              price="£0"
              meta="20 outputs · 48h delivery"
              bullets={['Quality score report', '2 verified contributors', 'No card required']}
              cta={{ label: 'Get test kit', href: '/portal/expert/new?product=TEST_KIT', variant: 'outline' }}
            />
            <PriceCard
              accent
              title={EXPERT_PRODUCTS[0].label}
              price={EXPERT_PRODUCTS[0].price}
              meta={`${EXPERT_PRODUCTS[0].outputs} · ${EXPERT_PRODUCTS[0].turnaround}`}
              bullets={['Full quality report', 'Inter-rater agreement score', 'Expert credentials disclosed']}
              cta={{ label: 'Buy sprint', href: `/portal/expert/new?product=${EXPERT_PRODUCTS[0].key}`, variant: 'expert' }}
            />
            <PriceCard
              title="Retainer"
              price="From £1,500"
              meta="per month"
              bullets={['Ongoing evaluation', 'Live quality dashboard', 'Dedicated coordinator (Growth+)']}
              cta={{ label: 'Compare retainers', href: '#retainers', variant: 'outline' }}
            />
          </div>

          <div id="retainers" className="scroll-mt-28 grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            <div className="md:col-span-3 text-label mb-1">Retainer tiers</div>
            {EXPERT_PRODUCTS.slice(1).map((p, i) => (
              <PriceCard
                key={p.key}
                accent
                featured={i === 1}
                title={p.label}
                price={p.price}
                meta={p.outputs}
                bullets={[p.description, p.turnaround, 'Cancellable monthly']}
                cta={{ label: 'Start retainer', href: `/portal/expert/new?product=${p.key}`, variant: 'expert' }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="text-label mb-7" style={{ color: 'var(--capture)' }}>Nxted Capture</div>

          <FadeUp>
            <Card className="p-8 mb-5 border-[var(--capture)] ring-1 ring-[var(--capture-dim)]">
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                <div className="lg:w-1/4">
                  <Badge tone="capture">Start here</Badge>
                  <h3 className="text-h3 mt-3">Physical AI Test Kit</h3>
                  <p className="text-[var(--text-primary)] text-3xl font-semibold mt-3">from $2,500</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">
                    5-10 usable hours · one skilled task · 7-10 day delivery
                  </p>
                </div>
                <div className="lg:flex-1 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {[
                    '5-10 usable hours of egocentric capture',
                    'One skilled task of your choice',
                    'Consent pack + full metadata',
                    'Basic action labels',
                    'LeRobot / RLDS / HDF5 sample',
                    '7-10 day delivery',
                  ].map((b) => (
                    <div key={b} className="flex gap-2.5 text-sm text-[var(--text-secondary)]">
                      <CheckCircle size={18} weight="fill" style={{ color: 'var(--capture)' }} className="shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <div className="shrink-0">
                  <Button href="/portal/capture/new" variant="capture" size="lg">
                    Request Test Kit
                    <ArrowRight size={18} weight="bold" />
                  </Button>
                </div>
              </div>
            </Card>
          </FadeUp>

          <p className="text-sm text-[var(--text-secondary)] mb-5 mt-2">
            Or commission a full dataset at production scale, priced per usable hour by skill level:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <PriceCard
              title="L1 Foundation"
              price="from $35 / hr"
              meta="Basic packing, sorting, assembly"
              bullets={['MP4 4K default', 'Basic annotations', '500h minimum']}
              cta={{ label: 'Quote', href: '/portal/capture/new', variant: 'outline' }}
            />
            <PriceCard
              title="L3 Technical"
              price="from $80 / hr"
              meta="CNC, welding, electronics"
              bullets={['Robotics-ready annotations', 'Pose + depth optional', '200h minimum']}
              cta={{ label: 'Quote', href: '/portal/capture/new', variant: 'outline' }}
            />
            <PriceCard
              title="L4 Professional"
              price="from $120 / hr"
              meta="Surgical, dental, lab work"
              bullets={['Full robotics annotations', 'Consent documentation', '100h minimum']}
              cta={{ label: 'Quote', href: '/portal/capture/new', variant: 'outline' }}
            />
          </div>

          <Card className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <CardTitle>Need a custom dataset?</CardTitle>
                <CardBody className="mt-2">Quote within 24 hours for any spec, format, and volume.</CardBody>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Badge tone="capture">RLDS / HDF5 / LeRobot</Badge>
                <Button href="/portal/capture/new" variant="capture">
                  Request a quote
                  <ArrowRight size={16} weight="bold" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function PriceCard({
  title,
  price,
  meta,
  bullets,
  cta,
  accent,
  featured,
}: {
  title: string;
  price: string;
  meta: string;
  bullets: string[];
  cta: { label: string; href: string; variant: 'expert' | 'outline' | 'capture' };
  accent?: boolean;
  featured?: boolean;
}) {
  return (
    <Card
      accent={accent ? 'expert' : undefined}
      className={`h-full flex flex-col ${featured ? 'border-[var(--expert)] ring-1 ring-[var(--expert-dim)]' : ''}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {featured && <Badge tone="expert">Popular</Badge>}
        </div>
      </CardHeader>
      <CardBody className="flex flex-col flex-1">
        <p className="text-[var(--text-primary)] text-3xl font-semibold mb-1">{price}</p>
        <p className="text-xs text-[var(--text-tertiary)] mb-6">{meta}</p>
        <ul className="space-y-2.5 text-sm text-[var(--text-secondary)] mb-7">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
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
  );
}
