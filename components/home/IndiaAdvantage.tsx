import { INDIA_NUMBERS } from '@/lib/constants';
import { FadeUp } from '@/components/motion/FadeUp';
import { WorkforceGraphic } from '@/components/graphics/Infographics';

export function IndiaAdvantage() {
  return (
    <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)] overflow-hidden">
      <div className="container-site grid lg:grid-cols-12 gap-12 xl:gap-20 items-start">
        <FadeUp className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="text-label mb-5" style={{ color: 'var(--india-saffron)' }}>India</div>
          <h2 className="text-h1 leading-[1] max-w-[16ch]">
            Skilled work, <span className="text-[var(--expert)]">verified and consented</span>.
          </h2>
          <p className="mt-6 text-body text-[var(--text-secondary)] max-w-[48ch]">
            India has one of the world's largest skilled labour forces. nxted captures only verified contributors and partner locations - with explicit consent, fair compensation above local market rate, and documented usage rights. Skill and provenance, not cost, are the point.
          </p>
          <div className="relative mt-10 aspect-[5/3] rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-card)] p-5">
            <WorkforceGraphic />
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
            All verified. All consented. All available through nxted.
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
