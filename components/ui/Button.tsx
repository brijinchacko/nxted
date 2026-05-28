import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'expert' | 'capture' | 'ghost' | 'outline' | 'subtle';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

interface ButtonProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: undefined;
}
interface LinkButtonProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
}

function styles(variant: Variant = 'expert', size: Size = 'md', fullWidth?: boolean) {
  const base =
    'inline-flex items-center justify-center font-medium tracking-tight transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none rounded-[8px] gap-2';
  const sizes: Record<Size, string> = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-[15px]',
    lg: 'h-14 px-8 text-base',
  };
  const variants: Record<Variant, string> = {
    expert:
      'bg-[var(--expert)] text-[#001416] hover:bg-[#7BEAEE] active:translate-y-[1px]',
    capture:
      'bg-transparent border border-[var(--capture)] text-[var(--capture)] hover:bg-[var(--capture-dim)] active:translate-y-[1px]',
    ghost:
      'bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-card)]',
    outline:
      'bg-transparent border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--border-bright)] hover:bg-[var(--bg-card)]',
    subtle:
      'bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]',
  };
  return cn(base, sizes[size], variants[variant], fullWidth && 'w-full');
}

export function Button(props: ButtonProps | LinkButtonProps) {
  const { variant, size, className, children, fullWidth } = props;
  const cls = cn(styles(variant, size, fullWidth), className);
  if ('href' in props && props.href) {
    const { href, target, rel } = props;
    return (
      <Link href={href} target={target} rel={rel} className={cls}>
        {children}
      </Link>
    );
  }
  const { href: _h, ...rest } = props as ButtonProps;
  void _h;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
