import Link from 'next/link';
import { GLOSSARY } from '@/lib/glossary';
import { pageMeta } from '@/lib/seo';
import { FadeUp } from '@/components/motion/FadeUp';

export const metadata = pageMeta({
  title: 'Physical AI & Robotics Data Glossary | nxted',
  description:
    'Plain-English definitions for physical AI and robotics data: egocentric data, VLA models, RLHF, RLDS, LeRobot, HDF5, teleoperation, data provenance, DPDP and the EU AI Act.',
  path: '/glossary',
  keywords: ['physical AI glossary', 'egocentric data definition', 'robotics data terms'],
});

export default function GlossaryIndexPage() {
  return (
    <section className="page-pad">
      <div className="container-site max-w-4xl">
        <div className="mb-12">
          <div className="text-label mb-4">Glossary</div>
          <h1 className="text-h1">Physical AI &amp; robotics data, defined</h1>
          <p className="text-body text-[var(--text-secondary)] mt-5 max-w-[60ch]">
            Short, plain-English definitions of the terms that come up when buying or building physical-AI training data.
          </p>
        </div>
        <div className="space-y-4">
          {GLOSSARY.map((g) => (
            <FadeUp key={g.slug}>
              <Link href={`/glossary/${g.slug}`} className="surface surface-hover p-5 block">
                <h2 className="text-h4 mb-1">{g.term}</h2>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{g.short}</p>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
