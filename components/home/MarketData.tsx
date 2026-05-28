import { CountUp } from '@/components/motion/CountUp';
import { FadeUp } from '@/components/motion/FadeUp';

const STATS = [
  { value: 165, prefix: '$', suffix: 'B', label: 'Humanoid robot market by 2034' },
  { value: 39, suffix: '%', label: 'CAGR of Embodied AI market' },
  { value: 54, suffix: '%', label: 'Improvement with egocentric human data' },
  { value: 500, suffix: 'M+', label: 'Indian skilled workers who can be filmed' },
];

export function MarketData() {
  return (
    <section className="section-pad bg-[var(--bg-base)] relative overflow-hidden">
      <div className="container-site">
        <FadeUp>
          <div className="text-label text-[var(--text-secondary)] mb-6">The Market</div>
          <h2 className="text-h2 max-w-3xl mb-16">
            Why physical AI is the <span className="text-[var(--expert)]">biggest underserved opportunity</span> in machine learning.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STATS.map((stat, i) => (
            <FadeUp key={i} delay={i * 0.08} className="border-l-2 border-[var(--border-default)] pl-6">
              <div className="text-[64px] md:text-[80px] font-bold tracking-[-0.04em] leading-none text-[var(--text-primary)]">
                <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-4 max-w-[180px]">{stat.label}</p>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4} className="mt-20 max-w-3xl">
          <blockquote className="text-h3 font-medium text-[var(--text-primary)] border-l-2 border-[var(--capture)] pl-8">
            "Robots cannot learn from the internet. Every skill a robot learns must come from a human demonstrating it. India has the humans. Nxted has the pipeline."
          </blockquote>
        </FadeUp>

        <FadeUp delay={0.5} className="mt-8 text-xs text-[var(--text-muted)] tracking-wider">
          Source: Fortune Business Insights, 2026 · NVIDIA EgoScale · Claru Research
        </FadeUp>
      </div>
    </section>
  );
}
