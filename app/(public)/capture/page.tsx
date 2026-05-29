import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Cube,
  HandPointing,
  Path,
  Eye,
  Waveform,
} from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/motion/FadeUp';
import { CountUp } from '@/components/motion/CountUp';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LevelCard } from '@/components/capture/LevelCard';
import { DatasetSpec } from '@/components/capture/DatasetSpec';
import { SkillCategory } from '@/components/capture/SkillCategory';
import { CAPTURE_LEVELS } from '@/lib/constants';
import {
  OPPORTUNITY_STATS,
  CAPTURE_STEPS,
  RIG_TIERS,
  PROOF_POINTS,
  FURTHER_READING,
} from '@/lib/capture-data';

export const metadata: Metadata = {
  title: 'Nxted Capture — Physical AI training data from India',
  description:
    'Egocentric human demonstration data for robots and embodied AI. Skilled Indian workers, research-grade capture rigs, robotics-ready formats (LeRobot, RLDS, HDF5). The scarce ingredient for physical AI — at India scale and cost.',
};

const MODALITIES = [
  { icon: Camera, label: 'First-person RGB', sub: 'up to 1408² / 30fps' },
  { icon: Cube, label: 'Depth + point cloud', sub: 'RealSense / ZED' },
  { icon: HandPointing, label: 'Hand pose', sub: 'per-joint tracking' },
  { icon: Path, label: '6DoF trajectory', sub: 'SLAM-derived' },
  { icon: Eye, label: 'Eye gaze', sub: 'attention signal' },
  { icon: Waveform, label: 'Action labels', sub: 'segmented + narrated' },
];

const CATEGORIES = [
  { title: 'Tailoring & Textile', examples: ['Hand stitching', 'Machine sewing', 'Pattern cutting'], count: '45M workers in India' },
  { title: 'Carpentry & Furniture', examples: ['Joinery', 'Lathe work', 'Lacquer finishing'], count: '15M+ workers' },
  { title: 'Cooking & Food', examples: ['Knife skills', 'Plating', 'Tandoor / griddle'], count: 'Multi-cuisine pool' },
  { title: 'CNC / Machining', examples: ['Lathe ops', 'Mill setup', 'Quality inspection'], count: 'IIT-trained operators' },
  { title: 'Medical & Surgical', examples: ['Suturing', 'Instrument handoff', 'Patient prep'], count: '500K doctors' },
  { title: 'Construction', examples: ['Bricklaying', 'Tile setting', 'Rebar tying'], count: '12M+ workers' },
];

export default function CapturePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="bg-[#1A0E06] hero-pad border-b border-[var(--border-dim)]">
        <div className="container-site grid lg:grid-cols-12 gap-12 xl:gap-20 items-center">
          <FadeUp className="lg:col-span-7">
            <div className="text-label mb-5" style={{ color: 'var(--capture)' }}>Nxted Capture</div>
            <h1 className="text-h1 max-w-[18ch]">
              Robots can&rsquo;t learn from the internet.
              <br />
              <span className="text-[var(--capture)]">They learn from people.</span>
            </h1>
            <div className="text-body text-[var(--text-secondary)] mt-6 max-w-[60ch] space-y-3">
              <p>
                LLMs had the whole internet to read. Robots have no internet of actions — the two largest open robot datasets combined add up to roughly <strong className="text-[var(--text-primary)]">5,000 hours</strong>. Physical AI is bottlenecked on one thing: first-person video of real humans doing real, skilled work.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                Nxted Capture records that data from India&rsquo;s skilled workforce — at a fraction of Western cost, with the diversity the scaling laws reward.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/portal/capture/new" variant="capture" size="lg">
                Request a dataset
                <ArrowRight size={18} weight="bold" />
              </Button>
              <Button href="/capture/levels" variant="outline" size="lg">
                Browse the catalogue
              </Button>
            </div>
          </FadeUp>

          <FadeUp delay={0.2} className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--border-default)]">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&h=1100&fit=crop"
                alt="Skilled garment worker in India"
                fill
                style={{ objectFit: 'cover', filter: 'brightness(0.62) saturate(1.05)' }}
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E06] via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6">
                <Badge tone="capture">Egocentric · first-person</Badge>
                <p className="text-sm text-[var(--text-primary)] mt-3">
                  Real hands. Real tools. Real workshops.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── The opportunity ──────────────────────────────── */}
      <section className="section-pad bg-[var(--bg-base)]">
        <div className="container-site">
          <FadeUp className="max-w-3xl mb-14">
            <div className="text-label mb-5">The opportunity</div>
            <h2 className="text-h2">
              The biggest bottleneck in robotics isn&rsquo;t compute or models. It&rsquo;s <span className="text-[var(--capture)]">data of humans doing things</span>.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {OPPORTUNITY_STATS.map((s, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <article className="surface p-7 h-full flex flex-col">
                  <div
                    className="font-bold tracking-[-0.04em] leading-none text-[var(--text-primary)]"
                    style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
                  >
                    {s.value >= 1000 ? (
                      <>~5,000{s.suffix}</>
                    ) : (
                      <CountUp end={s.value} prefix={'prefix' in s ? s.prefix : ''} suffix={s.suffix} />
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-3 flex-1">{s.label}</p>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mt-3">{s.source}</p>
                </article>
              </FadeUp>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <FadeUp className="surface p-7">
              <h3 className="text-h4 mb-3">No internet of actions</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Language models trained on trillions of web tokens. There is no equivalent corpus of physical manipulation — so robots have to be shown, demonstration by demonstration.
              </p>
            </FadeUp>
            <FadeUp delay={0.08} className="surface p-7">
              <h3 className="text-h4 mb-3">Diversity beats volume</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Peer-reviewed scaling laws (ICLR 2025) show robot-policy generalisation follows a power law in the <em>number of environments and objects</em> — exactly what a diverse, India-wide workforce provides.
              </p>
            </FadeUp>
            <FadeUp delay={0.16} className="surface p-7">
              <h3 className="text-h4 mb-3">The money is already moving</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Over $6B was invested in humanoid robotics in 2025. Robotics firms already spend $100M+ a year buying real-world data. The supply hasn&rsquo;t caught up. That&rsquo;s the gap.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── How we do it ─────────────────────────────────── */}
      <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)]">
        <div className="container-site">
          <FadeUp className="max-w-2xl mb-14">
            <div className="text-label mb-5">How it works</div>
            <h2 className="text-h2">
              From a skilled worker in a workshop to a <span className="text-[var(--capture)]">training-ready dataset</span>.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPTURE_STEPS.map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.06}>
                <article className="surface surface-hover p-7 h-full flex flex-col gap-4">
                  <div
                    className="font-bold tracking-[-0.04em] leading-none"
                    style={{ color: 'var(--capture)', fontSize: 'clamp(36px, 3.2vw, 48px)' }}
                  >
                    {step.n}
                  </div>
                  <h3 className="text-h4">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{step.body}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The capture rig ──────────────────────────────── */}
      <section className="section-pad bg-[var(--bg-base)]">
        <div className="container-site">
          <FadeUp className="max-w-2xl mb-6">
            <div className="text-label mb-5">The capture rig</div>
            <h2 className="text-h2">
              Built on the devices the <span className="text-[var(--capture)]">research field already trusts</span>.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="max-w-3xl mb-12">
            <p className="text-body text-[var(--text-secondary)]">
              We don&rsquo;t ship fictional proprietary hardware. Our rigs are built on Meta Project Aria, Intel RealSense, Stereolabs ZED, and the Universal Manipulation Interface — the same stack behind Ego-Exo4D and EgoMimic. Three tiers, matched to how training-ready you need the data to be.
            </p>
          </FadeUp>

          {/* Modalities strip */}
          <FadeUp delay={0.15} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {MODALITIES.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="surface p-4 flex flex-col gap-2">
                  <Icon size={22} weight="duotone" style={{ color: 'var(--capture)' }} />
                  <div className="text-sm text-[var(--text-primary)] font-medium leading-tight">{m.label}</div>
                  <div className="text-[11px] text-[var(--text-tertiary)]">{m.sub}</div>
                </div>
              );
            })}
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {RIG_TIERS.map((tier) => (
              <FadeUp key={tier.name} className="h-full">
                <article
                  className={`surface h-full flex flex-col p-7 ${
                    'featured' in tier && tier.featured ? 'border-[var(--capture)] ring-1 ring-[var(--capture-dim)]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-h3">{tier.name}</h3>
                    {'featured' in tier && tier.featured && <Badge tone="capture">Most popular</Badge>}
                  </div>
                  <p className="text-sm text-[var(--text-tertiary)] mb-5">{tier.tagline}</p>

                  <RigBlock label="Sensors" items={[...tier.sensors]} />
                  <RigBlock label="Outputs" items={[...tier.outputs]} />
                  <RigBlock label="Formats" items={[...tier.formats]} />

                  <div className="mt-auto pt-5 border-t border-[var(--border-dim)]">
                    <p className="text-sm text-[var(--text-primary)]">{tier.bestFor}</p>
                    <p className="text-[11px] text-[var(--text-tertiary)] mt-2 uppercase tracking-wider">
                      Built on {tier.builtOn}
                    </p>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The 5 levels ─────────────────────────────────── */}
      <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)]">
        <div className="container-site">
          <FadeUp className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="text-label mb-5" style={{ color: 'var(--capture)' }}>The 5 levels</div>
              <h2 className="text-h2 max-w-2xl">
                From basic packing to <span className="text-[var(--capture)]">specialist craft</span>.
              </h2>
            </div>
            <Button href="/capture/levels" variant="capture" size="sm">
              See all levels
              <ArrowRight size={16} weight="bold" />
            </Button>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPTURE_LEVELS.map((level) => (
              <LevelCard key={level.id} level={level} full />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Output formats ───────────────────────────────── */}
      <DatasetSpec />

      {/* ─── Proof / case studies ─────────────────────────── */}
      <section className="section-pad bg-[var(--bg-base)]">
        <div className="container-site">
          <FadeUp className="max-w-2xl mb-4">
            <div className="text-label mb-5">Proof it works</div>
            <h2 className="text-h2">
              The field has already shown human capture <span className="text-[var(--capture)]">trains better robots</span>.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="max-w-3xl mb-12">
            <p className="text-body text-[var(--text-secondary)]">
              We don&rsquo;t ask you to take our word for it. Here is what the leading labs and companies have published — every claim links to its source.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROOF_POINTS.map((p, i) => (
              <FadeUp key={p.title} delay={(i % 3) * 0.08}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface surface-hover p-7 h-full flex flex-col gap-4 group"
                >
                  <div className="flex items-center justify-between">
                    <Badge tone="capture">{p.tag}</Badge>
                    <ArrowUpRight size={18} className="text-[var(--text-tertiary)] group-hover:text-[var(--capture)] transition-colors" />
                  </div>
                  <h3 className="text-h4 leading-tight">{p.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] flex-1">{p.body}</p>
                  <div className="pt-4 border-t border-[var(--border-dim)] flex items-center justify-between">
                    <span className="text-sm font-medium text-[var(--capture)]">{p.metric}</span>
                    <span className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">{p.source}</span>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skill categories ─────────────────────────────── */}
      <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)]">
        <div className="container-site">
          <FadeUp className="mb-12 max-w-2xl">
            <div className="text-label mb-5">Skill categories</div>
            <h2 className="text-h2">
              What we can <span className="text-[var(--capture)]">record</span>.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((c) => (
              <SkillCategory key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why India ────────────────────────────────────── */}
      <section className="section-pad bg-[var(--bg-base)]">
        <div className="container-site grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="text-label mb-5" style={{ color: 'var(--capture)' }}>Why India</div>
            <h2 className="text-h2">
              The cost base of the East. The skill depth of <span className="text-[var(--capture)]">centuries of craft</span>.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-[var(--text-secondary)]">
            <Why label="Cost" body="US data-collection labour runs ~$20–48/hr (Tesla paid up to $48/hr for Optimus capture). India delivers the same skilled capture at a fraction of that — industry estimates put the differential at 70–90%." />
            <Why label="Diversity" body="45M garment workers, 15M+ carpenters, 12M+ construction workers, 500K doctors. The breadth of trades the scaling laws reward — and that Western, lab-bound datasets lack." />
            <Why label="Ethics" body="Workers paid above local market rate, fully consented, with signed releases and PII blurring. A GDPR-compliant DPA covers every frame. Ethical capture is a feature, not an afterthought." />
            <Why label="Scale" body="500 contributors today, scalable to 50,000 within six months. India already shipped 100,000+ hours of egocentric robot-training data to Hugging Face in 2025." />
          </div>
        </div>
      </section>

      {/* ─── Further reading ──────────────────────────────── */}
      <section className="section-pad-sm bg-[var(--bg-surface)] border-t border-[var(--border-dim)]">
        <div className="container-site">
          <div className="text-label mb-6">Further reading &amp; sources</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
            {FURTHER_READING.map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-2 border-b border-[var(--border-dim)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <span>{r.label}</span>
                <ArrowUpRight size={14} className="text-[var(--text-tertiary)] group-hover:text-[var(--capture)] shrink-0" />
              </a>
            ))}
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-8 max-w-3xl">
            Market forecasts are quoted as attributed estimates and diverge across analysts. Cost differentials are industry estimates presented as ranges. Research citations link to primary sources (company sites, arXiv, dataset homepages).
          </p>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="section-pad bg-[var(--bg-base)]">
        <div className="container-site">
          <div className="surface p-10 md:p-14 text-center">
            <h2 className="text-h2 max-w-[24ch] mx-auto mb-4">
              Tell us the skill. We&rsquo;ll capture the <span className="text-[var(--capture)]">data your robots need</span>.
            </h2>
            <p className="text-[var(--text-secondary)] max-w-[52ch] mx-auto mb-8">
              Custom datasets quoted within 24 hours, in any format your pipeline already uses.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/portal/capture/new" variant="capture" size="lg">
                Request a dataset <ArrowRight size={18} weight="bold" />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Talk to us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function RigBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mb-4">
      <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-tertiary)] mb-2">{label}</div>
      <ul className="space-y-1.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-sm text-[var(--text-secondary)]">
            <span className="text-[var(--capture)] shrink-0">›</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Why({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-6 py-4 border-b border-[var(--border-dim)] last:border-0">
      <span className="text-label" style={{ color: 'var(--text-primary)' }}>{label}</span>
      <p className="text-body">{body}</p>
    </div>
  );
}
