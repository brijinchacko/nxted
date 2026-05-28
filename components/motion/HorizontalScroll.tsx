'use client';

import { useRef } from 'react';

export function HorizontalScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        display: 'flex',
        gap: 16,
        padding: '8px 24px',
        scrollbarWidth: 'none',
      }}
    >
      {children}
    </div>
  );
}
