import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-baseline group leading-none">
      <span className="text-[26px] font-bold tracking-[-0.04em] text-[var(--text-primary)] group-hover:text-[var(--expert)] transition-colors">
        nxt
        <span className="text-[var(--expert)]">ED</span>
        <span className="text-[var(--text-secondary)] font-medium">.ai</span>
      </span>
    </Link>
  );
}
