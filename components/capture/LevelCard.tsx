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
    <article className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] overflow-hidden hover:border-[var(--capture)] transition-colors">
      <div className="relative h-[200px]">
        <Image
          src={level.image}
          alt={level.title}
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.6)' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
        <span
          className="absolute top-0 right-3 text-[180px] font-bold leading-none text-white/[0.05] pointer-events-none"
          style={{ letterSpacing: '-0.08em' }}
        >
          {level.number}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-label text-[var(--text-muted)]">Level {level.number}</span>
          <Badge tone="capture">{level.price}</Badge>
        </div>
        <h3 className="text-h3 mb-3">{level.title}</h3>
        <p className="text-[var(--text-secondary)] mb-4">{level.skills}</p>
        {full && (
          <div className="border-t border-[var(--border-dim)] pt-4 mt-4">
            <div className="text-label text-[var(--text-muted)] mb-2">Example task</div>
            <p className="text-sm text-[var(--text-primary)]">{level.example}</p>
          </div>
        )}
      </div>
    </article>
  );
}
