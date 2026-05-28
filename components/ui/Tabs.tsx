'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function Tabs({ items, defaultId }: { items: TabItem[]; defaultId?: string }) {
  const [active, setActive] = useState(defaultId || items[0]?.id);
  const current = items.find((i) => i.id === active);
  return (
    <div>
      <div className="flex gap-2 border-b border-[var(--border-dim)] mb-8">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={cn(
              'px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px',
              active === item.id
                ? 'border-[var(--expert)] text-[var(--text-primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>{current?.content}</div>
    </div>
  );
}
