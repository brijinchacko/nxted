import { Badge } from '@/components/ui/Badge';
import { LevelGraphic } from '@/components/graphics/Infographics';

interface LevelDetail {
  number: string;
  title: string;
  skills: string;
  complexity: number;
  price: string;
  example: string;
}

export function LevelCard({ level, full = false }: { level: LevelDetail; full?: boolean }) {
  return (
    <article className="surface surface-hover overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[16/10] bg-[var(--bg-surface)] border-b border-[var(--border-dim)]">
        <LevelGraphic number={level.number} />
        <span className="absolute top-4 left-5 text-[11px] tracking-[0.18em] uppercase text-[var(--text-secondary)]">
          Level {level.number}
        </span>
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-h3">{level.title}</h3>
          <Badge tone="capture">{level.price}</Badge>
        </div>
        <p className="text-[var(--text-secondary)] flex-1">{level.skills}</p>
        {full && (
          <div className="border-t border-[var(--border-dim)] pt-4 mt-2">
            <div className="text-label mb-2">Example task</div>
            <p className="text-sm text-[var(--text-primary)]">{level.example}</p>
          </div>
        )}
      </div>
    </article>
  );
}
