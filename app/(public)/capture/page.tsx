import type { Metadata } from 'next';
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
      <section className="bg-[#1A0E06] pt-[160px] pb-[100px] border-b border-[var(--border-dim)]">
        <div className="container-site grid lg:grid-cols-12 gap-12">
          <FadeUp className="lg:col-span-7">
            <div className="text-label text-[var(--capture)] mb-4">Nxted Capture</div>
            <h1 className="text-h1">
              Robots can't learn from the internet.
              <br />
              <span className="text-[var(--capture)]">But they can learn from India.</span>
            </h1>
            <div className="text-body text-[var(--text-secondary)] mt-6 max-w-xl space-y-4">
              <p>DoorDash paid its couriers to film themselves doing dishes.</p>
              <p>Apple Vision Pro recorded 829 hours of shoelace tying.</p>
              <p>NVIDIA showed 54% robot improvement from 20,000 hours of egocentric video.</p>
              <p className="text-[var(--text-primary)] font-medium">
                Nxted Capture gives you access to 500 million skilled Indian workers — filmable at 10× less cost than any Western competitor.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/capture/levels" variant="capture">
                Browse dataset catalogue
              </Button>
              <Button href="/portal/capture/new" variant="outline">
                Request custom capture
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <FadeUp className="mb-12">
            <div className="text-label text-[var(--capture)] mb-4">The 5 Levels</div>
            <h2 className="text-h2 max-w-2xl">From basic packing to <span className="text-[var(--capture)]">specialist craft</span>.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPTURE_LEVELS.map((level) => (
              <LevelCard key={level.id} level={level} full />
            ))}
          </div>
        </div>
      </section>

      <DatasetSpec />

      <section className="section-pad">
        <div className="container-site">
          <FadeUp className="mb-12">
            <div className="text-label text-[var(--text-secondary)] mb-4">Skill categories</div>
            <h2 className="text-h2 max-w-2xl">What we can <span className="text-[var(--capture)]">record</span>.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((c) => (
              <SkillCategory key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)]">
        <div className="container-site max-w-3xl">
          <div className="text-label text-[var(--capture)] mb-4">Why India</div>
          <h2 className="text-h2 mb-6">
            Volume. Diversity. Cost. English fluency. Skill range.
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)]">
            <p>
              <strong className="text-[var(--text-primary)]">Ethical collection:</strong> workers paid above local market rate, fully consented, GDPR-compliant documentation.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Quality control:</strong> every batch reviewed by expert team before delivery.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Scalability:</strong> 500 contributors today → 50,000 within 6 months if needed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
