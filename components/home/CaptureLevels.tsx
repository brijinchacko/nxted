'use client';

import Image from 'next/image';
import { CAPTURE_LEVELS } from '@/lib/constants';
import { FadeUp } from '@/components/motion/FadeUp';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function ComplexityDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={
            i <= level
              ? 'w-2 h-2 rounded-full bg-[var(--capture)]'
              : 'w-2 h-2 rounded-full border border-[var(--border-bright)]'
          }
        />
      ))}
    </div>
  );
}

export function CaptureLevels() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)]">
      <div className="container-site">
        <FadeUp className="mb-16">
          <div className="text-label text-[var(--capture)] mb-4">Nxted Capture</div>
          <h2 className="text-h1">
            5 Levels of
            <br />
            <span className="text-[var(--capture)]">Physical Intelligence</span>
          </h2>
        </FadeUp>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CAPTURE_LEVELS.map((level, i) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] overflow-hidden hover:border-[var(--capture)] transition-colors group"
            >
              <div className="relative h-[180px] overflow-hidden">
                <Image
                  src={level.image}
                  alt={level.title}
                  fill
                  style={{ objectFit: 'cover', filter: 'brightness(0.6)' }}
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
                <span
                  className="absolute top-0 right-2 text-[160px] font-bold leading-none text-white/[0.06] pointer-events-none"
                  style={{ letterSpacing: '-0.08em' }}
                >
                  {level.number}
                </span>
              </div>
              <div className="p-5">
                <div className="text-label text-[var(--text-muted)] mb-2">Level {level.number}</div>
                <h3 className="text-h4 mb-3">{level.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{level.skills}</p>
                <div className="flex items-center justify-between text-xs">
                  <ComplexityDots level={level.complexity} />
                  <span className="text-[var(--capture)] font-medium">{level.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
