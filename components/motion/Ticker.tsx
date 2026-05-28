'use client';

import { motion } from 'framer-motion';

export function Ticker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[var(--border-dim)] bg-[var(--bg-surface)] py-3.5">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="flex gap-[80px] whitespace-nowrap"
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="text-[11px] font-medium tracking-[0.16em] uppercase text-[var(--text-tertiary)] flex items-center gap-3"
          >
            <span className="w-1 h-1 rounded-full bg-[var(--border-bright)]" />
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
