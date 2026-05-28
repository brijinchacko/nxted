import { FadeUp } from '@/components/motion/FadeUp';

const CASES = [
  {
    tag: 'Nxted Expert',
    tagColor: 'var(--expert)',
    client: 'UK Industrial AI Company',
    challenge: 'AI model for predictive maintenance wrong 32% of the time.',
    action:
      '50 IIT-verified engineers evaluated 500 model outputs against domain rubrics.',
    result: 'Accuracy improved from 68% to 91% in 8 weeks.',
    quote:
      '"We tried Mercor. Their breach shut us down. Nxted onboarded us in 72 hours."',
    span: 'lg:col-span-7',
  },
  {
    tag: 'Nxted Capture',
    tagColor: 'var(--capture)',
    client: 'US Humanoid Robot Company',
    challenge: '1,000 hours of garment-making footage for manipulation training.',
    action: '200 professional tailors in Tirupur recorded across 60 task types.',
    result: 'Dataset delivered in 6 weeks at 82% below US equivalent cost.',
    quote:
      '"We had no idea India had this calibre of skilled workers available for capture."',
    span: 'lg:col-span-5',
  },
  {
    tag: 'Both products',
    tagColor: 'var(--text-primary)',
    client: 'EU AI Lab',
    challenge:
      'Building a surgical assistance AI — needed both text evaluation and physical data.',
    action:
      'Expert module evaluated 300 surgical AI outputs (AIIMS doctors). Capture recorded 150 hours of procedure-adjacent tasks.',
    result: 'Full pipeline served by one platform, one contract, one invoice.',
    quote: '',
    span: 'lg:col-span-12',
  },
];

export function CaseStudies() {
  return (
    <section className="section-pad bg-[var(--bg-base)]">
      <div className="container-site">
        <FadeUp className="mb-14 max-w-3xl">
          <div className="text-label mb-5">Case studies</div>
          <h2 className="text-h1">
            What happens when the right humans <span className="text-[var(--expert)]">train the right AI</span>.
          </h2>
        </FadeUp>

        <div className="grid lg:grid-cols-12 gap-5">
          {CASES.map((c, i) => (
            <FadeUp key={i} delay={i * 0.08} className={c.span}>
              <article className="surface p-8 md:p-10 h-full flex flex-col gap-5">
                <div className="text-label" style={{ color: c.tagColor }}>{c.tag}</div>
                <h3 className="text-h3">
                  {c.client}{' '}
                  <span className="text-[var(--text-tertiary)] text-base font-normal">anonymous</span>
                </h3>
                <dl className="grid sm:grid-cols-3 gap-5 flex-1">
                  <Detail term="Challenge" detail={c.challenge} />
                  <Detail term="What Nxted did" detail={c.action} />
                  <Detail term="Result" detail={c.result} highlight />
                </dl>
                {c.quote && (
                  <blockquote className="mt-2 pt-5 border-t border-[var(--border-dim)] text-[var(--text-primary)] italic">
                    {c.quote}
                  </blockquote>
                )}
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Detail({ term, detail, highlight }: { term: string; detail: string; highlight?: boolean }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-tertiary)] mb-1.5">{term}</dt>
      <dd className={highlight ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}>{detail}</dd>
    </div>
  );
}
