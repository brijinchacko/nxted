import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatGBP } from '@/lib/utils';
import { ArrowUpRight, Clock, CurrencyGbp, UsersThree } from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-dynamic';

const TRACK_LABEL: Record<string, string> = {
  EXPERT_EVAL: 'Expert eval',
  RED_TEAM: 'Red-team',
  COMPLIANCE: 'Compliance',
  WRITTEN_EVAL: 'Written eval',
  CAPTURE: 'Capture',
};

export default async function MarketplacePage() {
  const session = await auth();
  const contributor = session?.user.id
    ? await prisma.contributorProfile.findUnique({ where: { userId: session.user.id } })
    : null;

  const projects = await prisma.marketplaceProject
    .findMany({
      where: { status: 'OPEN' },
      orderBy: { createdAt: 'desc' },
      include: { applications: { where: { contributorId: contributor?.id || '__none__' } } },
    })
    .catch(() => []);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-h2">Project marketplace</h1>
        <p className="text-[var(--text-secondary)] mt-2">Open projects matched to your skills. Apply or get matched.</p>
      </div>

      {projects.length === 0 ? (
        <div className="surface p-10 text-center">
          <h2 className="text-h3 mb-2">No open projects right now</h2>
          <p className="text-[var(--text-secondary)]">New projects post daily. We'll email you when a match opens.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p) => {
            const alreadyApplied = p.applications.length > 0;
            const seatsLeft = Math.max(0, p.seatsAvailable - p.seatsFilled);
            return (
              <article key={p.id} className="surface surface-hover p-7 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge tone="expert">{TRACK_LABEL[p.track] || p.track}</Badge>
                    <h3 className="text-h4 mt-3">{p.title}</h3>
                    <div className="text-xs text-[var(--text-tertiary)] mt-1">{p.projectCode} · {p.domain}</div>
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)] whitespace-nowrap">
                    {seatsLeft} seat{seatsLeft === 1 ? '' : 's'}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-3">{p.summary}</p>
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[var(--border-dim)]">
                  <Meta icon={CurrencyGbp} label="Rate" value={`${formatGBP(p.hourlyRateGBP)} / hr`} />
                  <Meta icon={Clock} label="Est. hours" value={`${p.estimatedHours}h`} />
                  <Meta icon={UsersThree} label="Total" value={p.totalBudgetGBP ? formatGBP(p.totalBudgetGBP) : '-'} />
                </div>
                <div className="mt-auto pt-2 flex items-center justify-between">
                  <Link
                    href={`/me/marketplace/${p.id}`}
                    className="text-sm text-[var(--expert)] inline-flex items-center gap-1.5 hover:gap-2 transition-all"
                  >
                    Details <ArrowUpRight size={14} weight="bold" />
                  </Link>
                  {alreadyApplied ? (
                    <Badge tone="success">Applied</Badge>
                  ) : (
                    <Button href={`/me/marketplace/${p.id}`} variant="expert" size="sm">
                      Apply
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1 text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
        <Icon size={12} weight="duotone" />
        {label}
      </div>
      <div className="text-sm text-[var(--text-primary)] font-medium">{value}</div>
    </div>
  );
}
