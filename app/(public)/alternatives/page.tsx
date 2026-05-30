import { ALTERNATIVES } from '@/lib/programmatic';
import { EntityIndex } from '@/components/seo/EntityIndex';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Alternatives for Physical-AI & Robot Data | nxted',
  description:
    'Honest, neutral comparisons for buyers evaluating physical-AI data providers - where general platforms fit and where specialist egocentric capture fits.',
  path: '/alternatives',
  keywords: ['Scale AI alternative', 'Appen alternative', 'physical AI data provider'],
});

export default function AlternativesIndexPage() {
  return (
    <EntityIndex
      eyebrow="Alternatives"
      title="Choosing a physical-AI data provider"
      intro="Honest, neutral guides for buyers comparing data vendors. No disparagement - the right provider depends on whether you need annotation volume or skilled egocentric demonstrations."
      basePath="/alternatives"
      items={ALTERNATIVES}
    />
  );
}
