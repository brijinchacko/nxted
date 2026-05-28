import { cn } from '@/lib/utils';

export function Card({
  children,
  className,
  hoverable,
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  accent?: 'expert' | 'capture';
}) {
  return (
    <div
      className={cn(
        'surface p-6 md:p-7 transition-colors',
        hoverable && 'surface-hover',
        accent === 'expert' && 'hover:border-[var(--expert)]',
        accent === 'capture' && 'hover:border-[var(--capture)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-h4 text-[var(--text-primary)]', className)}>{children}</h3>;
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('text-[var(--text-secondary)] text-body', className)}>{children}</div>;
}
