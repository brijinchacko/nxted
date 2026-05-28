'use client';

import { motion } from 'framer-motion';

export function Ticker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--border-dim)',
        borderBottom: '1px solid var(--border-dim)',
        padding: '14px 0',
        background: 'var(--bg-surface)',
      }}
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '80px', whiteSpace: 'nowrap' }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
            }}
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
