import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatGBP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

async function getDashboardData(userId: string) {
  const client = await prisma.clientProfile.findUnique({
    where: { userId },
    include: {
      expertProjects: {
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { qualityReport: true },
      },
      captureOrders: { orderBy: { createdAt: 'desc' }, take: 5 },
      invoices: { where: { status: { not: 'PAID' } } },
    },
  });
  return client;
}

export default async function PortalDashboard() {
  const session = await auth();
  const client = session?.user.id ? await getDashboardData(session.user.id) : null;

  const expertProjects = client?.expertProjects ?? [];
  const captureOrders = client?.captureOrders ?? [];
  const invoices = client?.invoices ?? [];

  const activeProjects = expertProjects.filter((p) => p.status !== 'DELIVERED' && p.status !== 'ARCHIVED').length;
  const reportedProjects = expertProjects.filter((p) => p.qualityReport);
  const avgScore = reportedProjects.length
    ? reportedProjects.reduce((acc, p) => acc + (p.qualityReport?.overallScore ?? 0), 0) / reportedProjects.length
    : 0;
  const captureHours = captureOrders.reduce((acc, o) => acc + o.hoursRequested, 0);
  const outstandingTotal = invoices.reduce((acc, i) => acc + i.total, 0);

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-h2">Welcome back, {session?.user.firstName}.</h1>
        <p className="text-[var(--text-secondary)] mt-2">Here's what's happening across your work with Nxted.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader><CardTitle>Active projects</CardTitle></CardHeader>
          <CardBody><div className="text-h2 text-[var(--text-primary)]">{activeProjects}</div></CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Avg quality score</CardTitle></CardHeader>
          <CardBody><div className="text-h2 text-[var(--expert)]">{avgScore ? avgScore.toFixed(0) : '—'}</div></CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Capture hours ordered</CardTitle></CardHeader>
          <CardBody><div className="text-h2 text-[var(--capture)]">{captureHours}</div></CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Outstanding</CardTitle></CardHeader>
          <CardBody><div className="text-h2 text-[var(--text-primary)]">{formatGBP(outstandingTotal)}</div></CardBody>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button href="/portal/expert/new" variant="expert">+ New Expert project</Button>
        <Button href="/portal/capture/new" variant="capture">+ Request capture</Button>
        <Button href="/portal/quality" variant="outline">View quality dashboard</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Recent Expert projects</CardTitle></CardHeader>
          <CardBody>
            {client?.expertProjects.length ? (
              <ul className="divide-y divide-[var(--border-dim)]">
                {client.expertProjects.map((p) => (
                  <li key={p.id} className="py-3 flex items-center justify-between">
                    <Link href={`/portal/expert/${p.id}`} className="text-[var(--text-primary)] hover:text-[var(--expert)]">
                      {p.title}
                    </Link>
                    <Badge tone={p.status === 'DELIVERED' ? 'success' : 'expert'}>{p.status.replace(/_/g, ' ')}</Badge>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-[var(--text-muted)]">No projects yet.</p>}
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent Capture orders</CardTitle></CardHeader>
          <CardBody>
            {client?.captureOrders.length ? (
              <ul className="divide-y divide-[var(--border-dim)]">
                {client.captureOrders.map((o) => (
                  <li key={o.id} className="py-3 flex items-center justify-between">
                    <span className="text-[var(--text-primary)]">{o.orderCode} · {o.skillCategory}</span>
                    <Badge tone={o.status === 'DELIVERED' ? 'success' : 'capture'}>{o.status.replace(/_/g, ' ')}</Badge>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-[var(--text-muted)]">No orders yet.</p>}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
