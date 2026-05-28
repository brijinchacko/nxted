import { cn } from '@/lib/utils';

export function Progress({
  value,
  max = 100,
  accent = 'expert',
  className,
}: {
  value: number;
  max?: number;
  accent?: 'expert' | 'capture' | 'success';
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const color =
    accent === 'expert'
      ? 'bg-[var(--expert)]'
      : accent === 'capture'
        ? 'bg-[var(--capture)]'
        : 'bg-[var(--success)]';
  return (
    <div
      className={cn('h-1.5 rounded-full bg-[var(--bg-input)] overflow-hidden', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
    >
      <div className={cn('h-full transition-all duration-500', color)} style={{ width: `${pct}%` }} />
    </div>
  );
}
