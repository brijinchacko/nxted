import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/motion/FadeUp';
import { Button } from '@/components/ui/Button';
import { CaseStudyMini } from '@/components/graphics/Infographics';

const PREVIEWS = [
  {
    tag: 'Expert',
    tagColor: 'var(--expert)',
    variant: 'expert' as const,
    headline: 'Industrial AI · Predictive maintenance',
    result: '68% → 91% accuracy in 8 weeks',
    sub: 'UK industrial AI company',
  },
  {
    tag: 'Capture',
    tagColor: 'var(--capture)',
    variant: 'capture' as const,
    headline: 'Humanoid robotics · Garment manipulation',
    result: '1,000h delivered, 82% below US cost',
    sub: 'US humanoid robotics company',
  },
  {
    tag: 'Both',
    tagColor: 'var(--text-primary)',
    variant: 'both' as const,
    headline: 'Medical AI · Surgical assistance',
    result: 'Text + capture in one DPA',
    sub: 'EU AI research lab',
  },
];

export function CaseStudies() {
  return (
    <section className="section-pad bg-[var(--bg-base)]">
      <div className="container-site">
        <FadeUp className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-5xl">
          <div>
            <div className="text-label mb-5">Case studies</div>
            <h2 className="text-h1">
              What happens when the right humans <span className="text-[var(--expert)]">train the right AI</span>.
            </h2>
          </div>
          <Button href="/case-studies" variant="outline" size="sm">
            All case studies <ArrowRight size={16} weight="bold" />
          </Button>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PREVIEWS.map((p, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <a
                href="/case-studies"
                className="surface surface-hover overflow-hidden flex flex-col h-full group"
              >
                <div className="relative aspect-[16/10] bg-[var(--bg-surface)] border-b border-[var(--border-dim)] p-3">
                  <CaseStudyMini variant={p.variant} />
                  <span
                    className="absolute top-4 left-4 inline-flex items-center h-6 px-2.5 rounded text-[10px] uppercase tracking-wider font-medium"
                    style={{ background: 'rgba(0,0,0,0.5)', color: p.tagColor }}
                  >
                    Nxted {p.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="text-[11px] tracking-[0.16em] uppercase text-[var(--text-tertiary)]">{p.sub}</div>
                  <h3 className="text-h4 leading-tight">{p.headline}</h3>
                  <div className="mt-auto pt-4 border-t border-[var(--border-dim)] flex items-center justify-between">
                    <span className="text-sm text-[var(--text-primary)] font-medium">{p.result}</span>
                    <ArrowUpRight size={18} className="text-[var(--text-tertiary)] group-hover:text-[var(--expert)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
