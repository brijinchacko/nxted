import Image from 'next/image';
import { INDIA_NUMBERS } from '@/lib/constants';
import { FadeUp } from '@/components/motion/FadeUp';

export function IndiaAdvantage() {
  return (
    <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)] overflow-hidden">
      <div className="container-site grid lg:grid-cols-12 gap-12 items-center">
        <FadeUp className="lg:col-span-5">
          <div className="text-label mb-4" style={{ color: 'var(--india-saffron)' }}>India</div>
          <h2 className="text-h1 leading-[0.95]">
            The World's
            <br />
            Largest
            <br />
            Human
            <br />
            Intelligence
            <br />
            <span className="text-[var(--expert)]">Base.</span>
          </h2>
        </FadeUp>

        <div className="lg:col-span-7">
          <FadeUp delay={0.15} className="mb-8">
            <div className="relative h-[260px] rounded-[12px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1565514020179-026b92b2d70b?w=1200&h=700&fit=crop"
                alt="Indian skilled worker"
                fill
                style={{ objectFit: 'cover', filter: 'brightness(0.55) saturate(1.1)' }}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-surface)] via-transparent to-transparent" />
            </div>
          </FadeUp>

          <div className="divide-y divide-[var(--border-dim)]">
            {INDIA_NUMBERS.map((row, i) => (
              <FadeUp key={i} delay={0.2 + i * 0.04} className="py-4 flex items-baseline gap-6">
                <span className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] leading-none w-[140px] text-[var(--text-primary)] shrink-0">
                  {row.number}
                </span>
                <span className="text-[var(--text-secondary)] text-body">{row.label}</span>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.5} className="mt-8 text-h4 text-[var(--text-primary)]">
            All verified. All in India. All available through Nxted.
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
