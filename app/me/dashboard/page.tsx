import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { formatGBP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function ContributorDashboard() {
  const session = await auth();
  const contributor = session?.user.id
    ? await prisma.contributorProfile.findUnique({
        where: { userId: session.user.id },
        include: {
          tasks: { where: { status: { in: ['PENDING', 'IN_PROGRESS'] } } },
          payouts: { where: { status: 'PENDING' } },
        },
      })
    : null;

  const available = contributor?.tasks.filter((t) => t.status === 'PENDING').length || 0;
  const pendingEarnings = contributor?.payouts.reduce((acc, p) => acc + p.amount, 0) || 0;
  const monthCompleted = await prisma.evaluationTask.count({
    where: {
      contributorId: contributor?.id,
      status: 'COMPLETED',
      completedAt: { gte: new Date(Date.now() - 30 * 86400000) },
    },
  }).catch(() => 0);

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-h2">Welcome back, {session?.user.firstName}.</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Available tasks</CardTitle></CardHeader>
          <CardBody><div className="text-h2 text-[var(--expert)]">{available}</div></CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Tasks this month</CardTitle></CardHeader>
          <CardBody><div className="text-h2">{monthCompleted}</div></CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending earnings</CardTitle></CardHeader>
          <CardBody><div className="text-h2">{formatGBP(pendingEarnings)}</div></CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Profile snapshot</CardTitle></CardHeader>
        <CardBody>
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-[var(--text-muted)]">Verified</dt><dd>{contributor?.isVerified ? 'Yes' : 'Pending'}</dd>
            <dt className="text-[var(--text-muted)]">Average score</dt><dd>{contributor?.averageScore.toFixed(1) || '—'}</dd>
            <dt className="text-[var(--text-muted)]">Total tasks</dt><dd>{contributor?.totalTasks}</dd>
            <dt className="text-[var(--text-muted)]">Total earned</dt><dd>{formatGBP(contributor?.totalEarned || 0)}</dd>
          </dl>
        </CardBody>
      </Card>
    </div>
  );
}
