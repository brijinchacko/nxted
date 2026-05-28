'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CAPTURE_LEVELS } from '@/lib/constants';
import { FadeUp } from '@/components/motion/FadeUp';

function ComplexityDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={
            i <= level
              ? 'w-1.5 h-1.5 rounded-full bg-[var(--capture)]'
              : 'w-1.5 h-1.5 rounded-full border border-[var(--border-bright)]'
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
        <FadeUp className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-label mb-5" style={{ color: 'var(--capture)' }}>Nxted Capture</div>
            <h2 className="text-h1 max-w-[16ch]">
              5 levels of <span className="text-[var(--capture)]">physical intelligence</span>.
            </h2>
          </div>
          <Link
            href="/capture/levels"
            className="inline-flex items-center gap-2 text-[var(--capture)] font-medium hover:gap-3 transition-all"
          >
            See all levels <ArrowRight size={18} />
          </Link>
        </FadeUp>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {CAPTURE_LEVELS.map((level, i) => (
            <motion.article
              key={level.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="surface surface-hover overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-[var(--bg-surface)] overflow-hidden">
                <Image
                  src={level.image}
                  alt={level.title}
                  fill
                  style={{ objectFit: 'cover', filter: 'brightness(0.65)' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/30 to-transparent" />
                <span className="absolute top-3 left-4 text-[11px] tracking-[0.18em] uppercase text-[var(--text-secondary)]">
                  Level {level.number}
                </span>
                <span
                  className="absolute -bottom-4 right-3 text-[110px] font-bold leading-none text-white/[0.05] select-none pointer-events-none"
                  style={{ letterSpacing: '-0.06em' }}
                >
                  {level.number}
                </span>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="text-h4 leading-tight min-h-[2.6em]">{level.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] flex-1">{level.skills}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border-dim)]">
                  <ComplexityDots level={level.complexity} />
                  <span className="text-[var(--capture)] text-xs font-medium">{level.price}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
