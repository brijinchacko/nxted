import type { Metadata } from 'next';
import { LevelCard } from '@/components/capture/LevelCard';
import { CAPTURE_LEVELS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'The 5-Level Physical Intelligence Taxonomy',
  description:
    'L1 Foundation through L5 Specialist - how Nxted Capture classifies physical skill complexity for robotics training data.',
};

export default function LevelsPage() {
  return (
    <section className="page-pad bg-[var(--bg-surface)]">
      <div className="container-site">
        <div className="max-w-3xl mb-12">
          <div className="text-label text-[var(--capture)] mb-4">Taxonomy</div>
          <h1 className="text-h1 mb-6">
            5 Levels of <span className="text-[var(--capture)]">Physical Intelligence</span>
          </h1>
          <p className="text-body text-[var(--text-secondary)]">
            Robots learn differently depending on the complexity of the human task they're being trained on. The 5-level taxonomy is how we price, scope and source every Nxted Capture engagement.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CAPTURE_LEVELS.map((level) => (
            <LevelCard key={level.id} level={level} full />
          ))}
        </div>
        <div className="text-center">
          <Button href="/portal/capture/new" variant="capture" size="lg">
            Request a dataset
          </Button>
        </div>
      </div>
    </section>
  );
}
