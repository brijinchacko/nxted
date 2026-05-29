import Link from 'next/link';
import { cn } from '@/lib/utils';

export function LogoMark({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="9" fill="var(--expert)" />
      {/* Bold lowercase 'n' - left stem flows smoothly into an arch into the right stem */}
      <path
        d="M12.5 25.5 L12.5 17 A5.5 5.5 0 0 1 23.5 17 L23.5 25.5"
        stroke="#04181A"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* node / spark - the dual-product accent */}
      <circle cx="27.5" cy="9.5" r="2.4" fill="var(--capture)" />
    </svg>
  );
}

export function Logo({
  size = 'md',
  markOnly = false,
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  markOnly?: boolean;
  className?: string;
}) {
  const markPx = size === 'sm' ? 28 : size === 'lg' ? 40 : 32;
  const textCls = size === 'sm' ? 'text-[22px]' : size === 'lg' ? 'text-[34px]' : 'text-[26px]';

  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2.5 group leading-none', className)}
      aria-label="nxted home"
    >
      <span className="transition-transform duration-200 group-hover:scale-[1.06]">
        <LogoMark size={markPx} />
      </span>
      {!markOnly && (
        <span
          className={cn('font-bold tracking-[-0.01em] text-[var(--text-primary)]', textCls)}
          style={{ fontFamily: 'var(--font-logo), var(--font-body), sans-serif' }}
        >
          nxted
        </span>
      )}
    </Link>
  );
}
