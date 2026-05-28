import Link from 'next/link';
import { APP } from '@/lib/constants';

export function Logo({ withParent = true }: { withParent?: boolean }) {
  return (
    <Link href="/" className="flex flex-col leading-none group">
      <span className="text-[20px] font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--expert)] transition-colors">
        nxt<span className="text-[var(--expert)]">ED</span>
        <span className="text-[var(--text-secondary)] font-normal">.ai</span>
      </span>
      {withParent && (
        <span className="text-[9px] text-[var(--text-secondary)] tracking-[0.2em] uppercase mt-1">
          by {APP.brandParent}
        </span>
      )}
    </Link>
  );
}
