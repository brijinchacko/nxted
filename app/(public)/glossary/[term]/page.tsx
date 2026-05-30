import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GLOSSARY, glossaryBySlug } from '@/lib/glossary';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { definedTermSchema, breadcrumbSchema } from '@/lib/schema';

export function generateStaticParams() {
  return GLOSSARY.map((g) => ({ term: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const { term } = await params;
  const g = glossaryBySlug(term);
  if (!g) return { title: 'Not found' };
  return pageMeta({
    title: `${g.term} - definition | nxted glossary`,
    description: g.short.slice(0, 155),
    path: `/glossary/${g.slug}`,
  });
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  const g = glossaryBySlug(term);
  if (!g) notFound();
  const path = `/glossary/${g.slug}`;

  return (
    <section className="page-pad">
      <div className="container-site max-w-3xl">
        <nav className="text-xs text-[var(--text-tertiary)] mb-6 flex flex-wrap gap-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text-secondary)]">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/glossary" className="hover:text-[var(--text-secondary)]">Glossary</Link>
          <span aria-hidden>/</span>
          <span className="text-[var(--text-secondary)]">{g.term}</span>
        </nav>

        <h1 className="text-h1 mb-6">{g.term}</h1>
        <p className="text-body text-[var(--text-primary)] surface p-6 border-l-2 border-[var(--expert)]">{g.short}</p>

        {g.body.map((para) => (
          <p key={para} className="text-body text-[var(--text-secondary)] mt-6">{para}</p>
        ))}

        {g.related && g.related.length > 0 && (
          <div className="mt-10 pt-6 border-t border-[var(--border-dim)]">
            <div className="text-label text-[var(--text-tertiary)] mb-3">Related</div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {g.related.map((r) => (
                <Link key={r.href} href={r.href} className="text-sm text-[var(--expert)] underline">{r.label}</Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link href="/glossary" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">← All terms</Link>
        </div>
      </div>

      <JsonLd
        data={[
          definedTermSchema({ name: g.term, description: g.short, path }),
          breadcrumbSchema([
            { name: 'Glossary', path: '/glossary' },
            { name: g.term, path },
          ]),
        ]}
      />
    </section>
  );
}
