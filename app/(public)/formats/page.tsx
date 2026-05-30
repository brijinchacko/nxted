import { FORMATS } from '@/lib/programmatic';
import { EntityIndex } from '@/components/seo/EntityIndex';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Robotics Dataset Formats: LeRobot, RLDS, HDF5 | nxted',
  description:
    'The robotics dataset formats nxted delivers - LeRobot, RLDS and HDF5 - explained, with when to use each and how we ship them.',
  path: '/formats',
  keywords: ['robotics dataset formats', 'LeRobot RLDS HDF5'],
});

export default function FormatsIndexPage() {
  return (
    <EntityIndex
      eyebrow="Dataset formats"
      title="Robotics dataset formats nxted delivers"
      intro="Every nxted Capture dataset ships in LeRobot, RLDS and HDF5. Here is what each format is and when to choose it."
      basePath="/formats"
      items={FORMATS}
    />
  );
}
