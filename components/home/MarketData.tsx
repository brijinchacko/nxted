import { Robot, ChartLineUp, Eye, UsersThree } from '@phosphor-icons/react/dist/ssr';
import { CountUp } from '@/components/motion/CountUp';
import { FadeUp } from '@/components/motion/FadeUp';

const STATS = [
  {
    icon: Robot,
    value: 165,
    prefix: '$',
    suffix: 'B',
    label: 'Humanoid robot market by 2034',
    sub: 'Fortune Business Insights',
  },
  {
    icon: ChartLineUp,
    value: 39,
    suffix: '%',
    label: 'CAGR of Embodied AI market',
    sub: 'NVIDIA EgoScale',
  },
  {
    icon: Eye,
    value: 54,
    suffix: '%',
    label: 'Improvement with egocentric human data',
    sub: 'NVIDIA, 2026',
  },
  {
    icon: UsersThree,
    value: 500,
    suffix: 'M+',
    label: 'Indian skilled workers who can be filmed',
    sub: 'MoSPI India',
  },
];

export function MarketData() {
  return (
    <section className="section-pad bg-[var(--bg-base)] relative overflow-hidden">
      <div className="container-site relative">
        <FadeUp className="max-w-3xl">
          <div className="text-label mb-5">The Market</div>
          <h2 className="text-h2">
            Why physical AI is the <span className="text-[var(--expert)]">biggest underserved opportunity</span> in machine learning.
          </h2>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <FadeUp key={i} delay={i * 0.08}>
                <article className="surface surface-hover p-7 h-full flex flex-col gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[var(--expert-dim)] flex items-center justify-center">
                    <Icon size={22} weight="duotone" style={{ color: 'var(--expert)' }} />
                  </div>
                  <div
                    className="font-bold tracking-[-0.04em] leading-none text-[var(--text-primary)]"
                    style={{ fontSize: 'clamp(38px, 4vw, 56px)' }}
                  >
                    <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] flex-1">{stat.label}</p>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">{stat.sub}</p>
                </article>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp delay={0.4} className="mt-16 max-w-3xl">
          <blockquote className="text-h3 font-medium text-[var(--text-primary)] border-l-2 border-[var(--capture)] pl-6">
            "Robots cannot learn from the internet. Every skill a robot learns must come from a human demonstrating it. India has the humans. Nxted has the pipeline."
          </blockquote>
        </FadeUp>
      </div>
    </section>
  );
}
