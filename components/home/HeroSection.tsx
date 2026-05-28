'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { RevealText } from '@/components/motion/RevealText';
import { FadeUp } from '@/components/motion/FadeUp';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative hero-pad overflow-hidden">
      <div className="container-site grid lg:grid-cols-12 gap-12 xl:gap-20 items-center">
        <div className="lg:col-span-7">
          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 px-3 h-7 rounded-full border border-[var(--border-default)] text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] bg-[var(--bg-surface)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--expert)]" />
              Now serving UK · EU · US AI labs
            </span>
          </FadeUp>

          <h1 className="text-display mt-7 max-w-[14ch]">
            <RevealText text="Human Intelligence." className="block text-[var(--text-primary)]" />
            <RevealText
              text="Machine Scale."
              className="block text-[var(--expert)]"
              delay={0.35}
            />
          </h1>

          <FadeUp delay={0.6} className="mt-7 max-w-[52ch]">
            <p className="text-body text-[var(--text-secondary)]">
              The platform where India's brightest minds train the world's most advanced AI systems — text and physical. Two products. One mission. Zero compromise.
            </p>
          </FadeUp>

          <FadeUp delay={0.85} className="mt-8 flex flex-wrap gap-3">
            <Button href="/expert" variant="expert" size="lg">
              Train your text AI
              <ArrowRight size={18} weight="bold" />
            </Button>
            <Button href="/capture" variant="capture" size="lg">
              Capture physical data
              <ArrowRight size={18} weight="bold" />
            </Button>
          </FadeUp>

          <FadeUp delay={1.05} className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
            {['OFORO LTD', 'UK Registered', 'GDPR Compliant', 'India-based supply'].map((item) => (
              <span key={item} className="text-[11px] tracking-[0.18em] uppercase text-[var(--text-tertiary)]">
                {item}
              </span>
            ))}
          </FadeUp>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-card)]"
          >
            <div className="grid grid-cols-1 gap-px bg-[var(--border-default)]">
              <HeroPanel
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&h=700&fit=crop"
                alt="Engineer reviewing AI output"
                accent="expert"
                label="Expert"
                sub="RLHF · evaluation · red-team"
              />
              <HeroPanel
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&h=700&fit=crop"
                alt="Tailor working in India"
                accent="capture"
                label="Capture"
                sub="Egocentric video · 5 levels"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(92,225,230,0.08), transparent 70%)',
        }}
      />
    </section>
  );
}

function HeroPanel({
  src,
  alt,
  accent,
  label,
  sub,
}: {
  src: string;
  alt: string;
  accent: 'expert' | 'capture';
  label: string;
  sub: string;
}) {
  const color = accent === 'expert' ? 'var(--expert)' : 'var(--capture)';
  const overlay =
    accent === 'expert'
      ? 'from-[rgba(92,225,230,0.20)] via-transparent to-transparent'
      : 'from-[rgba(255,140,66,0.20)] via-transparent to-transparent';
  return (
    <div className="relative h-[240px] md:h-[280px] bg-[var(--bg-base)]">
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover', filter: 'brightness(0.5)' }}
        sizes="(max-width: 1024px) 100vw, 45vw"
        priority={accent === 'expert'}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${overlay}`} />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="text-[11px] tracking-[0.18em] uppercase mb-1" style={{ color }}>
          {label}
        </div>
        <div className="text-sm text-[var(--text-primary)]">{sub}</div>
      </div>
    </div>
  );
}
