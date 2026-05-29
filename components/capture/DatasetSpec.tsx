import { Badge } from '@/components/ui/Badge';
import { FormatPipelineGraphic } from '@/components/graphics/Infographics';

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
    <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)]">
      <div className="container-site grid lg:grid-cols-12 gap-12 xl:gap-20">
        <div className="lg:col-span-5">
          <div className="text-label mb-5" style={{ color: 'var(--capture)' }}>Formats</div>
          <h2 className="text-h2 max-w-[16ch]">
            We deliver in formats your robotics pipeline <span className="text-[var(--capture)]">already uses</span>.
          </h2>
          <div className="flex flex-wrap gap-2 mt-7">
            {FORMATS.map((f) => (
              <Badge key={f} tone="capture">
                {f}
              </Badge>
            ))}
          </div>
          <div className="surface mt-8 p-5 aspect-[2/1]">
            <FormatPipelineGraphic />
          </div>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-10">
          <div>
            <div className="text-label mb-4">Every dataset includes</div>
            <ul className="space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[var(--text-primary)]">
                  <span className="text-[var(--success)] mt-1 shrink-0">✓</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-label mb-4">Optional enrichment</div>
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
      </div>
    </section>
  );
}
