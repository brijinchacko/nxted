'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { RevealText } from '@/components/motion/RevealText';
import { FadeUp } from '@/components/motion/FadeUp';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="pt-[120px] pb-[60px] md:pt-[160px] md:pb-[80px] min-h-[100vh] flex items-center relative overflow-hidden">
      <div className="container-site grid lg:grid-cols-12 gap-12 items-center w-full">
        <div className="lg:col-span-7">
          <div className="text-display">
            <RevealText text="Human Intelligence." className="text-[var(--text-primary)]" />
            <RevealText
              text="Machine Scale."
              className="text-[var(--expert)]"
              delay={0.35}
            />
          </div>

          <FadeUp delay={0.6} className="mt-8 max-w-xl">
            <p className="text-body text-[var(--text-secondary)]">
              The platform where India's brightest minds train the world's most advanced AI systems — text and physical.
            </p>
          </FadeUp>

          <FadeUp delay={0.75} className="mt-4 max-w-xl">
            <p className="text-body text-[var(--text-primary)] font-medium">
              Two products. One mission. Zero compromise.
            </p>
          </FadeUp>

          <FadeUp delay={0.95} className="mt-10 flex flex-wrap gap-3">
            <Button href="/expert" variant="expert" size="lg">
              ▸ Train Your Text AI →
            </Button>
            <Button href="/capture" variant="capture" size="lg">
              Capture Physical Data
            </Button>
          </FadeUp>

          <FadeUp delay={1.15} className="mt-10">
            <p className="text-xs text-[var(--text-muted)] tracking-[0.12em] uppercase">
              OFORO LTD · UK Registered · GDPR Compliant · India-based supply
            </p>
          </FadeUp>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative h-[280px] md:h-[320px] overflow-hidden rounded-t-[12px]">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=700&fit=crop"
                alt="Indian engineer at work"
                fill
                style={{ objectFit: 'cover', filter: 'brightness(0.45)' }}
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(92,225,230,0.25)] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-label text-[var(--expert)]">Expert</div>
            </div>
            <div className="h-px bg-[var(--border-bright)] relative">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[var(--bg-base)] px-3 text-[10px] tracking-[0.2em] uppercase text-[var(--text-secondary)]">
                Expert | Capture
              </span>
            </div>
            <div className="relative h-[280px] md:h-[320px] overflow-hidden rounded-b-[12px]">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&h=700&fit=crop"
                alt="Tailor working in India"
                fill
                style={{ objectFit: 'cover', filter: 'brightness(0.45)' }}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(255,140,66,0.25)] via-transparent to-transparent" />
              <div className="absolute top-3 left-4 text-label text-[var(--capture)]">Capture</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[700px] -z-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(92,225,230,0.08), transparent 70%)',
        }}
      />
    </section>
  );
}
