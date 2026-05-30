import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALTERNATIVES, bySlug } from '@/lib/programmatic';
import { EntityPageView } from '@/components/seo/EntityPageView';
import { pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return ALTERNATIVES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = bySlug(ALTERNATIVES, slug);
  if (!a) return { title: 'Not found' };
  return pageMeta({ title: a.metaTitle, description: a.metaDesc, path: `/alternatives/${a.slug}`, keywords: a.keywords });
}

export default async function AlternativePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = bySlug(ALTERNATIVES, slug);
  if (!a) notFound();
  return <EntityPageView page={a} basePath="/alternatives" baseLabel="Alternatives" />;
}
