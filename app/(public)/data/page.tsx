import { VERTICALS } from '@/lib/programmatic';
import { EntityIndex } from '@/components/seo/EntityIndex';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Data Verticals: Industrial & Skilled-Work Datasets | nxted',
  description:
    'Egocentric robot training data by vertical - electrical assembly, CNC and machine tending, electronics, garment manipulation and warehouse handling.',
  path: '/data',
  keywords: ['industrial manipulation dataset', 'robot training data verticals'],
});

export default function DataIndexPage() {
  return (
    <EntityIndex
      eyebrow="Data verticals"
      title="Egocentric training data, by vertical"
      intro="nxted Capture leads with skilled industrial and technical work. Pick a vertical to see what we capture, why it is valuable, and how it is delivered."
      basePath="/data"
      items={VERTICALS}
      accent="capture"
    />
  );
}
