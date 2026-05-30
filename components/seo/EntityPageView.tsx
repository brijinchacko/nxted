import Link from 'next/link';
import { FadeUp } from '@/components/motion/FadeUp';
import { Button } from '@/components/ui/Button';
import { DirectAnswer } from '@/components/seo/DirectAnswer';
import { FaqSection } from '@/components/seo/FaqSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export interface EntityPage {
  slug: string;
  eyebrow: string;
  accent: 'expert' | 'capture';
  title: string;
  metaTitle: string;
  metaDesc: string;
  keywords?: string[];
  question: string;
  directAnswer: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  faq: { q: string; a: string }[];
  ctaHref: string;
  ctaLabel: string;
  related?: { label: string; href: string }[];
}

export function EntityPageView({
  page,
  basePath,
  baseLabel,
  extraSchema = [],
}: {
  page: EntityPage;
  basePath: string;
  baseLabel: string;
  extraSchema?: object[];
}) {
  const accentVar = page.accent === 'capture' ? 'var(--capture)' : 'var(--expert)';
  const path = `${basePath}/${page.slug}`;
  return (
    <>
      <section className="page-pad">
        <div className="container-site max-w-4xl">
          <nav className="text-xs text-[var(--text-tertiary)] mb-6 flex flex-wrap gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--text-secondary)]">Home</Link>
            <span aria-hidden>/</span>
            <Link href={basePath} className="hover:text-[var(--text-secondary)]">{baseLabel}</Link>
            <span aria-hidden>/</span>
            <span className="text-[var(--text-secondary)]">{page.title}</span>
          </nav>

          <div className="text-label mb-4" style={{ color: accentVar }}>{page.eyebrow}</div>
          <h1 className="text-h1 mb-8 max-w-[26ch]">{page.title}</h1>

          <DirectAnswer question={page.question} accent={page.accent}>
            {page.directAnswer}
          </DirectAnswer>

          <div className="mt-12 space-y-10">
            {page.sections.map((s) => (
              <FadeUp key={s.heading}>
                <h2 className="text-h3 mb-3">{s.heading}</h2>
                <p className="text-body text-[var(--text-secondary)]">{s.body}</p>
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                        <span style={{ color: accentVar }} className="shrink-0">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </FadeUp>
            ))}
          </div>

          {page.related && page.related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[var(--border-dim)]">
              <div className="text-label text-[var(--text-tertiary)] mb-3">Related</div>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {page.related.map((r) => (
                  <Link key={r.href} href={r.href} className="text-sm text-[var(--expert)] underline">
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="surface mt-12 p-8 md:p-10 text-center">
            <Button href={page.ctaHref} variant={page.accent} size="lg">{page.ctaLabel}</Button>
          </div>
        </div>
      </section>

      <FaqSection items={page.faq} heading="FAQ" accent={page.accent} />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: baseLabel, path: basePath },
            { name: page.title, path },
          ]),
          ...extraSchema,
        ]}
      />
    </>
  );
}
