import { FadeUp } from '@/components/motion/FadeUp';

const CASES = [
  {
    tag: 'Nxted Expert',
    tagColor: 'text-[var(--expert)]',
    client: 'UK Industrial AI Company',
    challenge: 'AI model for predictive maintenance wrong 32% of the time.',
    action:
      '50 IIT-verified engineers evaluated 500 model outputs against domain rubrics.',
    result: 'Accuracy improved from 68% to 91% in 8 weeks.',
    quote:
      '"We tried Mercor. Their breach shut us down. Nxted onboarded us in 72 hours."',
    span: 'md:col-span-7',
  },
  {
    tag: 'Nxted Capture',
    tagColor: 'text-[var(--capture)]',
    client: 'US Humanoid Robot Company',
    challenge: '1,000 hours of garment-making footage for manipulation training.',
    action:
      '200 professional tailors in Tirupur recorded across 60 task types.',
    result: 'Dataset delivered in 6 weeks at 82% below US equivalent cost.',
    quote:
      '"We had no idea India had this calibre of skilled workers available for capture."',
    span: 'md:col-span-5',
  },
  {
    tag: 'Both Products',
    tagColor: 'text-[var(--text-primary)]',
    client: 'EU AI Lab',
    challenge:
      'Building a surgical assistance AI — needed both text evaluation and physical data.',
    action:
      'Expert module: 300 surgical AI outputs evaluated by AIIMS doctors. Capture: 150 hours of procedure-adjacent tasks.',
    result: 'Full pipeline served by one platform, one contract, one invoice.',
    quote: '',
    span: 'md:col-span-12',
  },
];

export function CaseStudies() {
  return (
    <section className="section-pad bg-[var(--bg-base)]">
      <div className="container-site">
        <FadeUp className="mb-14">
          <div className="text-label text-[var(--text-secondary)] mb-4">Case Studies</div>
          <h2 className="text-h1 max-w-2xl">What happens when the right humans <span className="text-[var(--expert)]">train the right AI</span>.</h2>
        </FadeUp>

        <div className="grid md:grid-cols-12 gap-6">
          {CASES.map((c, i) => (
            <FadeUp key={i} delay={i * 0.08} className={c.span}>
              <article className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-8 h-full flex flex-col">
                <div className={`text-label ${c.tagColor} mb-3`}>{c.tag}</div>
                <h3 className="text-h3 mb-5">{c.client} <span className="text-[var(--text-muted)] text-base">(anonymous)</span></h3>
                <dl className="space-y-4 text-[var(--text-secondary)] flex-1">
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">Challenge</dt>
                    <dd>{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">What Nxted did</dt>
                    <dd>{c.action}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">Result</dt>
                    <dd className="text-[var(--text-primary)] font-medium">{c.result}</dd>
                  </div>
                </dl>
                {c.quote && (
                  <blockquote className="mt-6 pt-6 border-t border-[var(--border-dim)] italic text-[var(--text-primary)]">
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
