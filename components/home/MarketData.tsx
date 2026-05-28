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
    <section className="section-pad bg-[var(--bg-base)]">
      <div className="container-site">
        <FadeUp className="max-w-3xl">
          <div className="text-label mb-5">The Market</div>
          <h2 className="text-h2">
            Why physical AI is the <span className="text-[var(--expert)]">biggest underserved opportunity</span> in machine learning.
          </h2>
        </FadeUp>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {STATS.map((stat, i) => (
            <FadeUp key={i} delay={i * 0.08} className="border-l-2 border-[var(--border-default)] pl-5">
              <div
                className="font-bold tracking-[-0.04em] leading-none text-[var(--text-primary)]"
                style={{ fontSize: 'clamp(40px, 4.5vw, 64px)' }}
              >
                <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-3 max-w-[24ch]">{stat.label}</p>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4} className="mt-16 max-w-3xl">
          <blockquote className="text-h3 font-medium text-[var(--text-primary)] border-l-2 border-[var(--capture)] pl-6">
            "Robots cannot learn from the internet. Every skill a robot learns must come from a human demonstrating it. India has the humans. Nxted has the pipeline."
          </blockquote>
          <p className="mt-4 text-xs text-[var(--text-tertiary)] tracking-wider">
            Source: Fortune Business Insights, 2026 · NVIDIA EgoScale · Claru Research
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
