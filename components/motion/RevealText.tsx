'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function RevealText({
  text,
  className = '',
  delay = 0,
  as: Tag = 'span',
  perWord = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
  perWord?: number;
}) {
  const [visible, setVisible] = useState(false);
  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(' ');
  return (
    <Tag ref={(node: HTMLElement | null) => { elRef.current = node; }} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={false}
          animate={visible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 14, filter: 'blur(5px)' }}
          transition={{ duration: 0.5, delay: delay + i * perWord, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  );
}
