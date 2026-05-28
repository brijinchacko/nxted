import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';

interface LevelDetail {
  number: string;
  title: string;
  skills: string;
  complexity: number;
  price: string;
  example: string;
  image: string;
}

export function LevelCard({ level, full = false }: { level: LevelDetail; full?: boolean }) {
  return (
    <article className="surface surface-hover overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[16/10] bg-[var(--bg-surface)]">
        <Image
          src={level.image}
          alt={level.title}
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.65)' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/30 to-transparent" />
        <span className="absolute top-4 left-5 text-[11px] tracking-[0.18em] uppercase text-[var(--text-secondary)]">
          Level {level.number}
        </span>
        <span
          className="absolute -bottom-4 right-4 text-[140px] font-bold leading-none text-white/[0.05] pointer-events-none select-none"
          style={{ letterSpacing: '-0.06em' }}
        >
          {level.number}
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
