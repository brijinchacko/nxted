import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VERTICALS, bySlug } from '@/lib/programmatic';
import { EntityPageView } from '@/components/seo/EntityPageView';
import { pageMeta } from '@/lib/seo';
import { serviceSchema } from '@/lib/schema';

export function generateStaticParams() {
  return VERTICALS.map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ vertical: string }> }): Promise<Metadata> {
  const { vertical } = await params;
  const v = bySlug(VERTICALS, vertical);
  if (!v) return { title: 'Not found' };
  return pageMeta({ title: v.metaTitle, description: v.metaDesc, path: `/data/${v.slug}`, keywords: v.keywords });
}

export default async function VerticalPage({ params }: { params: Promise<{ vertical: string }> }) {
  const { vertical } = await params;
  const v = bySlug(VERTICALS, vertical);
  if (!v) notFound();
  return (
    <EntityPageView
      page={v}
      basePath="/data"
      baseLabel="Data verticals"
      extraSchema={[
        serviceSchema({
          name: v.title,
          description: v.metaDesc,
          serviceType: 'Physical AI training data collection',
          path: `/data/${v.slug}`,
        }),
      ]}
    />
  );
}
