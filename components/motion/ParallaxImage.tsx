'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export function ParallaxImage({
  src,
  alt,
  height = 480,
  overlay,
}: {
  src: string;
  alt: string;
  height?: number;
  overlay?: 'expert' | 'capture' | 'dark';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const overlayBg =
    overlay === 'expert'
      ? 'bg-gradient-to-b from-transparent via-transparent to-[rgba(92,225,230,0.18)]'
      : overlay === 'capture'
        ? 'bg-gradient-to-b from-transparent via-transparent to-[rgba(255,140,66,0.20)]'
        : 'bg-gradient-to-b from-transparent to-black/40';
  return (
    <div ref={ref} style={{ height }} className="relative overflow-hidden rounded-[12px]">
      <motion.div style={{ y, height: height + 160, position: 'relative' }}>
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover', filter: 'brightness(0.55)' }} sizes="(max-width: 768px) 100vw, 50vw" />
      </motion.div>
      <div className={`absolute inset-0 pointer-events-none ${overlayBg}`} />
    </div>
  );
}
