import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FORMATS, bySlug } from '@/lib/programmatic';
import { EntityPageView } from '@/components/seo/EntityPageView';
import { pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return FORMATS.map((f) => ({ format: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ format: string }> }): Promise<Metadata> {
  const { format } = await params;
  const f = bySlug(FORMATS, format);
  if (!f) return { title: 'Not found' };
  return pageMeta({ title: f.metaTitle, description: f.metaDesc, path: `/formats/${f.slug}`, keywords: f.keywords });
}

export default async function FormatPage({ params }: { params: Promise<{ format: string }> }) {
  const { format } = await params;
  const f = bySlug(FORMATS, format);
  if (!f) notFound();
  return <EntityPageView page={f} basePath="/formats" baseLabel="Dataset formats" />;
}
