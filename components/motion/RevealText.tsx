'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function RevealText({
  text,
  className = '',
  delay = 0,
  as: Tag = 'span',
  perWord = 0.06,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
  perWord?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const words = text.split(' ');
  return (
    <Tag
      ref={ref as unknown as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.5, delay: delay + i * perWord, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
