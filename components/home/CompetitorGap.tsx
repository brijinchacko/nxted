import { COMPETITORS } from '@/lib/constants';
import { FadeUp } from '@/components/motion/FadeUp';

export function CompetitorGap() {
  return (
    <section className="section-pad bg-[var(--bg-base)]">
      <div className="container-site">
        <FadeUp className="mb-14 max-w-3xl">
          <div className="text-label text-[var(--text-secondary)] mb-4">The Competitor Gap</div>
          <h2 className="text-h1">
            Why AI labs are moving away from the <span className="text-[var(--capture)]">market leaders</span>.
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {COMPETITORS.map((c, i) => (
            <FadeUp key={c.name} delay={i * 0.06}>
              <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-7 h-full">
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <h3 className="text-h3">{c.name}</h3>
                </div>
                <div className="text-xs text-[var(--text-muted)] tracking-wider uppercase mb-4">{c.sub}</div>
                <p className="text-[var(--text-secondary)] text-body">{c.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4} className="mt-16">
          <div className="text-h2 max-w-3xl">
            Every competitor serves one market.
            <br />
            <span className="text-[var(--expert)]">Nxted serves both.</span>
            <br />
            And we do it from India — at a fraction of their cost.
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
