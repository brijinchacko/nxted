import Link from 'next/link';
import { ArrowUpRight, Briefcase, Sparkle, Wallet, Star } from '@phosphor-icons/react/dist/ssr';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { formatGBP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const STATUS_TONE: Record<string, 'success' | 'warning' | 'danger' | 'neutral'> = {
  APPROVED: 'success',
  SUBMITTED: 'warning',
  UNDER_REVIEW: 'warning',
  ASSESSMENT_PENDING: 'warning',
  REJECTED: 'danger',
  DRAFT: 'neutral',
};

const STATUS_HELP: Record<string, string> = {
  SUBMITTED: "We review every application within 3 business days.",
  UNDER_REVIEW: 'Your application is being reviewed by our team.',
  ASSESSMENT_PENDING: 'You have an assessment available — complete it to get matched.',
  APPROVED: "You're fully approved. Browse projects to start earning.",
  REJECTED: 'Your application was not progressed at this time.',
  DRAFT: 'Complete your application to get matched.',
};

export default async function ContributorDashboard() {
  const session = await auth();
  const contributor = session?.user.id
    ? await prisma.contributorProfile.findUnique({
        where: { userId: session.user.id },
        include: {
          tasks: { where: { status: { in: ['PENDING', 'IN_PROGRESS'] } } },
          payouts: { where: { status: 'PENDING' } },
          applications: {
            include: { project: true },
            orderBy: { appliedAt: 'desc' },
            take: 5,
          },
        },
      })
    : null;

  const [openProjects, monthCompleted] = await Promise.all([
    prisma.marketplaceProject.count({ where: { status: 'OPEN' } }).catch(() => 0),
    prisma.evaluationTask.count({
      where: {
        contributorId: contributor?.id,
        status: 'COMPLETED',
        completedAt: { gte: new Date(Date.now() - 30 * 86400000) },
      },
    }).catch(() => 0),
  ]);

  const available = contributor?.tasks.length || 0;
  const pendingEarnings = contributor?.payouts.reduce((acc, p) => acc + p.amount, 0) || 0;
  const offers = contributor?.applications.filter((a) => a.status === 'OFFER_SENT').length || 0;
  const activeApps = contributor?.applications.filter((a) => ['APPLIED', 'SHORTLISTED'].includes(a.status)).length || 0;

  const appStatus = contributor?.applicationStatus || 'DRAFT';

  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-h2">Welcome back, {session?.user.firstName}.</h1>
          {contributor?.headline && (
            <p className="text-[var(--text-secondary)] mt-1">{contributor.headline}</p>
          )}
        </div>
        <Badge tone={STATUS_TONE[appStatus] || 'neutral'}>{appStatus.replace(/_/g, ' ')}</Badge>
      </div>

      {STATUS_HELP[appStatus] && (
        <div className="surface p-5 flex items-start gap-3">
          <Sparkle size={20} weight="duotone" style={{ color: 'var(--expert)' }} className="shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--text-secondary)]">{STATUS_HELP[appStatus]}</p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Briefcase} label="Open projects" value={openProjects} accent="expert" href="/me/marketplace" />
        <StatCard icon={Sparkle} label="Pending offers" value={offers} accent="capture" href="/me/applications" />
        <StatCard icon={Star} label="Tasks (30 days)" value={monthCompleted} />
        <StatCard icon={Wallet} label="Pending payout" value={formatGBP(pendingEarnings)} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="surface p-7">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-h4">Quick stats</h2>
          </div>
          <dl className="grid grid-cols-2 gap-y-4 text-sm">
            <Detail label="Reliability score" value={contributor ? `${contributor.reliabilityScore.toFixed(1)} / 5` : '—'} />
            <Detail label="Average score" value={contributor ? contributor.averageScore.toFixed(1) : '—'} />
            <Detail label="Total tasks" value={contributor?.totalTasks ?? 0} />
            <Detail label="Total earned" value={formatGBP(contributor?.totalEarned || 0)} />
            <Detail label="Active applications" value={activeApps} />
            <Detail label="Available tasks" value={available} />
          </dl>
        </section>

        <section className="surface p-7">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-h4">Recent applications</h2>
            <Link href="/me/applications" className="text-xs text-[var(--expert)] hover:underline">
              See all →
            </Link>
          </div>
          {contributor?.applications.length ? (
            <ul className="divide-y divide-[var(--border-dim)]">
              {contributor.applications.map((a) => (
                <li key={a.id} className="py-3 flex items-center justify-between gap-3">
                  <Link href={`/me/marketplace/${a.project.id}`} className="text-sm text-[var(--text-primary)] hover:text-[var(--expert)] truncate">
                    {a.project.title}
                  </Link>
                  <Badge tone={
                    a.status === 'OFFER_SENT' ? 'expert'
                    : a.status === 'OFFER_ACCEPTED' ? 'success'
                    : a.status === 'REJECTED' || a.status === 'OFFER_DECLINED' ? 'danger'
                    : 'warning'
                  }>
                    {a.status.replace(/_/g, ' ')}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--text-tertiary)]">No applications yet. <Link href="/me/marketplace" className="text-[var(--expert)] underline">Browse projects</Link>.</p>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accent?: 'expert' | 'capture';
  href?: string;
}) {
  const inner = (
    <div className="surface surface-hover p-6 h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: accent === 'capture' ? 'var(--capture-dim)' : 'var(--expert-dim)' }}
        >
          <Icon size={18} weight="duotone" style={{ color: accent === 'capture' ? 'var(--capture)' : 'var(--expert)' }} />
        </div>
        {href && <ArrowUpRight size={14} className="text-[var(--text-tertiary)]" />}
      </div>
      <div>
        <div className="text-2xl font-semibold text-[var(--text-primary)]">{value}</div>
        <div className="text-xs text-[var(--text-secondary)] mt-1">{label}</div>
      </div>
    </div>
  );
  if (href) return <Link href={href}>{inner}</Link>;
  return inner;
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-[10px] tracking-wider uppercase text-[var(--text-tertiary)] mb-1">{label}</div>
      <div className="text-[var(--text-primary)] font-medium">{value}</div>
    </div>
  );
}
