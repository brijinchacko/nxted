import { cn } from '@/lib/utils';

type Tone = 'expert' | 'capture' | 'success' | 'warning' | 'danger' | 'neutral';

const tones: Record<Tone, string> = {
  expert:
    'text-[var(--expert)] bg-[var(--expert-dim)] border-[rgba(92,225,230,0.3)]',
  capture:
    'text-[var(--capture)] bg-[var(--capture-dim)] border-[rgba(255,140,66,0.3)]',
  success: 'text-[var(--success)] bg-[rgba(52,211,153,0.10)] border-[rgba(52,211,153,0.3)]',
  warning: 'text-[var(--warning)] bg-[rgba(251,191,36,0.10)] border-[rgba(251,191,36,0.3)]',
  danger: 'text-[var(--danger)] bg-[rgba(248,113,113,0.10)] border-[rgba(248,113,113,0.3)]',
  neutral: 'text-[var(--text-secondary)] bg-[var(--bg-card)] border-[var(--border-default)]',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 h-6 rounded-md border text-[11px] font-medium tracking-wider uppercase',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
