import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/motion/FadeUp';

export function ProductSplit() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="grid md:grid-cols-2 gap-px bg-[var(--border-dim)] rounded-2xl overflow-hidden border border-[var(--border-default)]">
          <FadeUp className="bg-[#0D1A1A] p-10 md:p-12 lg:p-14 flex flex-col">
            <div className="text-label" style={{ color: 'var(--expert)' }}>Nxted Expert</div>
            <h2 className="text-h2 mt-5 max-w-[18ch]">
              Human experts evaluate your AI <span className="text-[var(--expert)]">at the highest level</span>.
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-5 max-w-[42ch]">
              RLHF feedback, red-teaming, and structured training data from India's IIT engineers, AIIMS doctors, IIM consultants and ILS lawyers - the world's deepest talent base.
            </p>
            <div className="flex flex-wrap gap-2 mt-7">
              <Tag>Quick Sprint £249</Tag>
              <Tag>Monthly from £1,500</Tag>
            </div>
            <Link
              href="/expert"
              className="mt-auto pt-8 inline-flex items-center gap-2 text-[var(--expert)] font-medium hover:gap-3 transition-all w-fit"
            >
              Learn more <ArrowRight size={18} />
            </Link>
          </FadeUp>
          <FadeUp delay={0.1} className="bg-[#1A100A] p-10 md:p-12 lg:p-14 flex flex-col">
            <div className="text-label" style={{ color: 'var(--capture)' }}>Nxted Capture</div>
            <h2 className="text-h2 mt-5 max-w-[18ch]">
              Real humans. Real skills. <span className="text-[var(--capture)]">Real environments</span>.
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-5 max-w-[42ch]">
              Egocentric video from India's 45M garment workers, 15M carpenters, and elite medical professionals. Robotics-ready formats: RLDS, HDF5, LeRobot.
            </p>
            <div className="flex flex-wrap gap-2 mt-7">
              <Tag>5-level skill taxonomy</Tag>
              <Tag>From $35/hr of footage</Tag>
            </div>
            <Link
              href="/capture"
              className="mt-auto pt-8 inline-flex items-center gap-2 text-[var(--capture)] font-medium hover:gap-3 transition-all w-fit"
            >
              Request a dataset <ArrowRight size={18} />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)]">
      {children}
    </span>
  );
}
