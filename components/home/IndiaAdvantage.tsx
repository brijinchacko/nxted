import Image from 'next/image';
import { INDIA_NUMBERS } from '@/lib/constants';
import { FadeUp } from '@/components/motion/FadeUp';

export function IndiaAdvantage() {
  return (
    <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)] overflow-hidden">
      <div className="container-site grid lg:grid-cols-12 gap-12 xl:gap-20 items-start">
        <FadeUp className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="text-label mb-5" style={{ color: 'var(--india-saffron)' }}>India</div>
          <h2 className="text-h1 leading-[1] max-w-[14ch]">
            The world's largest <span className="text-[var(--expert)]">human intelligence base</span>.
          </h2>
          <p className="mt-6 text-body text-[var(--text-secondary)] max-w-[44ch]">
            500 million skilled workers. World-class IITs, AIIMS, IIMs and NLUs. English fluency. The supply structure no other country can match.
          </p>
          <div className="relative mt-10 aspect-[5/3] rounded-2xl overflow-hidden border border-[var(--border-default)]">
            <Image
              src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=800&fit=crop"
              alt="Skilled Indian craftsperson at work"
              fill
              style={{ objectFit: 'cover', filter: 'brightness(0.55) saturate(1.1)' }}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent" />
          </div>
        </FadeUp>

        <div className="lg:col-span-7">
          <ul className="divide-y divide-[var(--border-dim)]">
            {INDIA_NUMBERS.map((row, i) => (
              <FadeUp key={i} delay={0.05 + i * 0.04} className="py-5 grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] items-baseline gap-6">
                <span
                  className="font-bold tracking-[-0.03em] leading-none text-[var(--text-primary)]"
                  style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}
                >
                  {row.number}
                </span>
                <span className="text-[var(--text-secondary)] text-body">{row.label}</span>
              </FadeUp>
            ))}
          </ul>
          <FadeUp delay={0.5} className="mt-10 text-h4 text-[var(--text-primary)]">
            All verified. All in India. All available through Nxted.
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
