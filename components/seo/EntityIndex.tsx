import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { FadeUp } from '@/components/motion/FadeUp';
import type { EntityPage } from '@/components/seo/EntityPageView';

export function EntityIndex({
  eyebrow,
  title,
  intro,
  basePath,
  items,
  accent = 'expert',
}: {
  eyebrow: string;
  title: string;
  intro: string;
  basePath: string;
  items: Pick<EntityPage, 'slug' | 'eyebrow' | 'accent' | 'title' | 'metaDesc'>[];
  accent?: 'expert' | 'capture';
}) {
  return (
    <section className="page-pad">
      <div className="container-site">
        <div className="max-w-3xl mb-12">
          <div className="text-label mb-4" style={{ color: accent === 'capture' ? 'var(--capture)' : 'var(--expert)' }}>
            {eyebrow}
          </div>
          <h1 className="text-h1">{title}</h1>
          <p className="text-body text-[var(--text-secondary)] mt-5">{intro}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <FadeUp key={it.slug}>
              <Link href={`${basePath}/${it.slug}`} className="surface surface-hover p-6 h-full flex flex-col gap-3">
                <Badge tone={it.accent === 'capture' ? 'capture' : 'expert'}>{it.eyebrow}</Badge>
                <h2 className="text-h4">{it.title}</h2>
                <p className="text-sm text-[var(--text-secondary)] flex-1">{it.metaDesc}</p>
                <span className="text-sm text-[var(--expert)]">Learn more →</span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
