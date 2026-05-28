import { Badge } from '@/components/ui/Badge';

const FORMATS = ['MP4 4K', 'RLDS', 'HDF5', 'LeRobot', 'Custom'];
const INCLUDED = [
  'First-person (egocentric) perspective',
  'Action timestamps and task segmentation',
  'Worker skill level and experience metadata',
  'Environment classification',
  'Ethics consent documentation (GDPR-compliant)',
];
const OPTIONAL = ['Depth maps', 'Pose skeletons', 'Semantic segmentation', 'Optical flow', 'Hand tracking', 'Action labels'];

export function DatasetSpec() {
  return (
    <section className="section-pad bg-[var(--bg-surface)]">
      <div className="container-site grid md:grid-cols-2 gap-12">
        <div>
          <div className="text-label text-[var(--capture)] mb-4">Formats</div>
          <h2 className="text-h2 mb-6">
            We deliver in formats your robotics pipeline <span className="text-[var(--capture)]">already uses</span>.
          </h2>
          <div className="flex flex-wrap gap-2">
            {FORMATS.map((f) => (
              <Badge key={f} tone="capture">
                {f}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <div className="text-label text-[var(--text-secondary)] mb-3">Every dataset includes</div>
          <ul className="space-y-2 mb-8">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[var(--text-primary)]">
                <span className="text-[var(--success)] mt-1">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="text-label text-[var(--text-secondary)] mb-3">Optional enrichment</div>
          <div className="flex flex-wrap gap-2">
            {OPTIONAL.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-md border border-[var(--border-default)] text-xs text-[var(--text-secondary)]"
              >
                + {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
