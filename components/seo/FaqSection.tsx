import { JsonLd } from './JsonLd';
import { faqSchema } from '@/lib/schema';

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Accessible FAQ (native <details>, no JS needed) that also emits FAQPage
 * JSON-LD from the same data. Answers are in the SSR HTML so AI engines can
 * lift them. Keep answers self-contained and ~40-60 words.
 */
export function FaqSection({
  items,
  heading = 'Frequently asked questions',
  eyebrow = 'FAQ',
  accent = 'expert',
}: {
  items: FaqItem[];
  heading?: string;
  eyebrow?: string;
  accent?: 'expert' | 'capture';
}) {
  const accentVar = accent === 'capture' ? 'var(--capture)' : 'var(--expert)';
  return (
    <section className="section-pad bg-[var(--bg-base)] border-t border-[var(--border-dim)]">
      <div className="container-site max-w-3xl">
        <div className="text-label mb-4" style={{ color: accentVar }}>
          {eyebrow}
        </div>
        <h2 className="text-h2 mb-8">{heading}</h2>
        <div className="border-t border-[var(--border-dim)]">
          {items.map((item) => (
            <details key={item.q} className="group border-b border-[var(--border-dim)] py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-h4">
                <span>{item.q}</span>
                <span
                  className="shrink-0 text-2xl leading-none transition-transform group-open:rotate-45"
                  style={{ color: accentVar }}
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="text-body text-[var(--text-secondary)] mt-3">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqSchema(items)} />
    </section>
  );
}
