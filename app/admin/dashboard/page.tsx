import { prisma } from '@/lib/prisma';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [newLeads, expertProjects, captureOrders, unassignedExpert, unquotedCapture, unverifiedContributors] = await Promise.all([
    prisma.lead.count({ where: { createdAt: { gte: monthStart } } }).catch(() => 0),
    prisma.expertProject.count({ where: { createdAt: { gte: monthStart } } }).catch(() => 0),
    prisma.captureOrder.count({ where: { createdAt: { gte: monthStart } } }).catch(() => 0),
    prisma.expertProject.findMany({
      where: { status: 'SUBMITTED' },
      take: 5,
      include: { clientProfile: true },
    }).catch(() => []),
    prisma.captureOrder.findMany({
      where: {
        status: 'QUOTE_REQUESTED',
        createdAt: { lt: new Date(Date.now() - 24 * 3600_000) },
      },
      take: 5,
      include: { clientProfile: true },
    }).catch(() => []),
    prisma.contributorProfile.findMany({ where: { isVerified: false }, take: 5, include: { user: true } }).catch(() => []),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-h2">Admin dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardHeader><CardTitle>New leads (month)</CardTitle></CardHeader><CardBody><div className="text-h2">{newLeads}</div></CardBody></Card>
        <Card><CardHeader><CardTitle>Expert projects (month)</CardTitle></CardHeader><CardBody><div className="text-h2 text-[var(--expert)]">{expertProjects}</div></CardBody></Card>
        <Card><CardHeader><CardTitle>Capture orders (month)</CardTitle></CardHeader><CardBody><div className="text-h2 text-[var(--capture)]">{captureOrders}</div></CardBody></Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Projects awaiting assignment</CardTitle></CardHeader>
          <CardBody>
            {unassignedExpert.length === 0 ? <p className="text-sm text-[var(--text-muted)]">All caught up.</p> : (
              <ul className="space-y-2">
                {unassignedExpert.map((p) => (
                  <li key={p.id} className="flex justify-between text-sm">
                    <Link href={`/admin/expert-projects/${p.id}`} className="text-[var(--text-primary)] hover:text-[var(--expert)]">{p.title}</Link>
                    <Badge tone="warning">{p.clientProfile.companyName}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Capture quotes &gt; 24h</CardTitle></CardHeader>
          <CardBody>
            {unquotedCapture.length === 0 ? <p className="text-sm text-[var(--text-muted)]">All within SLA.</p> : (
              <ul className="space-y-2">
                {unquotedCapture.map((o) => (
                  <li key={o.id} className="flex justify-between text-sm">
                    <Link href={`/admin/capture-orders/${o.id}`} className="text-[var(--text-primary)] hover:text-[var(--capture)]">{o.orderCode}</Link>
                    <Badge tone="danger">{o.clientProfile.companyName}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Contributors pending</CardTitle></CardHeader>
          <CardBody>
            {unverifiedContributors.length === 0 ? <p className="text-sm text-[var(--text-muted)]">No backlog.</p> : (
              <ul className="space-y-2">
                {unverifiedContributors.map((c) => (
                  <li key={c.id} className="flex justify-between text-sm">
                    <Link href={`/admin/contributors`} className="text-[var(--text-primary)] hover:text-[var(--expert)]">{c.user.firstName} {c.user.lastName}</Link>
                    <Badge tone="warning">Review</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
