import type { Metadata } from 'next';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/motion/FadeUp';
import { Button } from '@/components/ui/Button';
import { LevelCard } from '@/components/capture/LevelCard';
import { DatasetSpec } from '@/components/capture/DatasetSpec';
import { SkillCategory } from '@/components/capture/SkillCategory';
import { CAPTURE_LEVELS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Nxted Capture — Physical AI training data from India',
  description:
    'Egocentric video from India\'s skilled workers. 5-level taxonomy. RLDS, HDF5, LeRobot formats. 10× cheaper than US capture.',
};

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
      <section className="bg-[#1A0E06] hero-pad border-b border-[var(--border-dim)]">
        <div className="container-site grid lg:grid-cols-12 gap-12 xl:gap-20 items-center">
          <FadeUp className="lg:col-span-7">
            <div className="text-label mb-5" style={{ color: 'var(--capture)' }}>Nxted Capture</div>
            <h1 className="text-h1 max-w-[18ch]">
              Robots can't learn from the internet.
              <br />
              <span className="text-[var(--capture)]">But they can learn from India.</span>
            </h1>
            <div className="text-body text-[var(--text-secondary)] mt-6 max-w-[58ch] space-y-3">
              <p>DoorDash paid its couriers to film themselves doing dishes. Apple Vision Pro recorded 829 hours of shoelace tying. NVIDIA showed 54% robot improvement from 20,000 hours of egocentric video.</p>
              <p className="text-[var(--text-primary)] font-medium">
                Nxted Capture gives you access to 500 million skilled Indian workers — filmable at 10× less cost than any Western competitor.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/capture/levels" variant="capture" size="lg">
                Browse dataset catalogue
                <ArrowRight size={18} weight="bold" />
              </Button>
              <Button href="/portal/capture/new" variant="outline" size="lg">
                Request custom capture
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.2} className="lg:col-span-5">
            <div className="surface overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-[var(--border-default)]">
                {[
                  { label: '54%', sub: 'NVIDIA robot improvement', bg: 'bg-[#1A0E06]' },
                  { label: '$165B', sub: 'Humanoid market by 2034', bg: 'bg-[#1A0E06]' },
                  { label: '829h', sub: 'Apple Vision Pro shoelace data', bg: 'bg-[#1A0E06]' },
                  { label: '10×', sub: 'Cheaper than US capture', bg: 'bg-[#1A0E06]' },
                ].map((stat) => (
                  <div key={stat.label} className={`${stat.bg} p-6`}>
                    <div className="text-h2 text-[var(--capture)]">{stat.label}</div>
                    <div className="text-xs text-[var(--text-secondary)] mt-1">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section-pad">
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

      <DatasetSpec />

      <section className="section-pad">
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

      <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)]">
        <div className="container-site grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="text-label mb-5" style={{ color: 'var(--capture)' }}>Why India</div>
            <h2 className="text-h2">
              Volume. Diversity. Cost. <span className="text-[var(--capture)]">English fluency.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-[var(--text-secondary)]">
            <Why label="Ethical collection" body="Workers paid above local market rate, fully consented, GDPR-compliant documentation." />
            <Why label="Quality control" body="Every batch reviewed by expert team before delivery." />
            <Why label="Scalability" body="500 contributors today, 50,000 within 6 months if needed." />
          </div>
        </div>
      </section>
    </>
  );
}

function Why({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-6 py-4 border-b border-[var(--border-dim)] last:border-0">
      <span className="text-label" style={{ color: 'var(--text-primary)' }}>{label}</span>
      <p className="text-body">{body}</p>
    </div>
  );
}
