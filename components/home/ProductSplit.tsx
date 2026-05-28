import Link from 'next/link';
import { FadeUp } from '@/components/motion/FadeUp';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function ProductSplit() {
  return (
    <section className="relative">
      <div className="grid md:grid-cols-2 min-h-[520px]">
        <FadeUp className="bg-[#0D1A1A] px-8 md:px-16 py-20 flex flex-col justify-center border-r border-[var(--border-dim)]">
          <div className="text-label text-[var(--expert)] mb-4">Nxted Expert</div>
          <h2 className="text-h2 mb-6">
            Human experts evaluate your AI <span className="text-[var(--expert)]">at the highest level</span>.
          </h2>
          <p className="text-body text-[var(--text-secondary)] mb-6 max-w-md">
            RLHF feedback, red-teaming, and structured training data from India's
            IIT engineers, AIIMS doctors, IIM consultants and ILS lawyers — the
            world's deepest talent base.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-3 py-1.5 rounded-md border border-[var(--border-default)] text-sm text-[var(--text-primary)]">
              Quick Sprint: £249
            </span>
            <span className="px-3 py-1.5 rounded-md border border-[var(--border-default)] text-sm text-[var(--text-primary)]">
              Monthly from £1,500
            </span>
          </div>
          <Link
            href="/expert"
            className="inline-flex items-center gap-2 text-[var(--expert)] font-medium hover:gap-3 transition-all w-fit"
          >
            Learn more <ArrowRight size={18} />
          </Link>
        </FadeUp>
        <FadeUp delay={0.1} className="bg-[#1A100A] px-8 md:px-16 py-20 flex flex-col justify-center">
          <div className="text-label text-[var(--capture)] mb-4">Nxted Capture</div>
          <h2 className="text-h2 mb-6">
            Real humans. Real skills. <span className="text-[var(--capture)]">Real environments</span>.
          </h2>
          <p className="text-body text-[var(--text-secondary)] mb-6 max-w-md">
            Egocentric video from India's 45M garment workers, 15M carpenters, and elite medical professionals. Robotics-ready formats: RLDS, HDF5, LeRobot.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-3 py-1.5 rounded-md border border-[var(--border-default)] text-sm text-[var(--text-primary)]">
              5-level skill taxonomy
            </span>
            <span className="px-3 py-1.5 rounded-md border border-[var(--border-default)] text-sm text-[var(--text-primary)]">
              From $35/hr of footage
            </span>
          </div>
          <Link
            href="/capture"
            className="inline-flex items-center gap-2 text-[var(--capture)] font-medium hover:gap-3 transition-all w-fit"
          >
            Request a dataset <ArrowRight size={18} />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
