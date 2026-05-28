'use client';

import { Children } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function StaggerGrid({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const items = Children.toArray(children);
  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
