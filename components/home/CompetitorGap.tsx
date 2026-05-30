import { COMPETITORS } from '@/lib/constants';
import { FadeUp } from '@/components/motion/FadeUp';

export function CompetitorGap() {
  return (
    <section className="section-pad bg-[var(--bg-base)]">
      <div className="container-site">
        <FadeUp className="mb-14 max-w-3xl">
          <div className="text-label mb-5">How we compare</div>
          <h2 className="text-h1">
            Where most data providers stop, and <span className="text-[var(--capture)]">where nxted starts</span>.
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-5">
          {COMPETITORS.map((c, i) => (
            <FadeUp key={c.type} delay={i * 0.06}>
              <article className="surface p-7 md:p-8 h-full flex flex-col gap-4">
                <h3 className="text-h3">{c.type}</h3>
                <div>
                  <div className="text-[10px] tracking-[0.16em] uppercase text-[var(--text-tertiary)] mb-1">Typical limitation</div>
                  <p className="text-[var(--text-secondary)] text-body">{c.limitation}</p>
                </div>
                <div className="mt-auto pt-2 border-t border-[var(--border-dim)]">
                  <div className="text-[10px] tracking-[0.16em] uppercase text-[var(--text-tertiary)] mb-1">nxted's focus</div>
                  <p className="text-[var(--text-primary)] font-medium">{c.focus}</p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4} className="mt-16">
          <div className="text-h2 max-w-4xl leading-tight">
            Most providers are broad annotation vendors, expert-evaluation networks, or generic egocentric collectors.{' '}
            <span className="text-[var(--expert)]">nxted focuses on expert-reviewed physical-skill data from real Indian work environments, delivered robotics-ready.</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
