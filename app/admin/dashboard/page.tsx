import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getTrafficStats, pctChange } from '@/lib/analytics';
import { Kpi, TrafficChart, BarList } from '@/components/admin/Charts';

export const dynamic = 'force-dynamic';

const gbp = (n: number) => '£' + Math.round(n || 0).toLocaleString();
const fmtPath = (p: string) => (p === '/' ? '/ (home)' : p.replace('/research/', '/blog/'));
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const sourceLabel = (s: string) => (s === 'ai' ? 'AI assistants' : cap(s));
const fmtDate = (d: Date) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

const STAGES = ['LEAD', 'CONTACTED', 'CALL_BOOKED', 'PROPOSAL', 'PILOT', 'ACTIVE', 'CHURNED'];

export default async function AdminDashboard() {
  const since30 = new Date(Date.now() - 30 * 86_400_000);
  const traffic = await getTrafficStats(30);

  const [
    captureRev,
    expertRev,
    invoicedPaid,
    pipelineVal,
    totalUsers,
    clients,
    contributors,
    signups30,
    pendingContrib,
    captureCount,
    expertCount,
    leadsByStage,
    recentCapture,
    recentExpert,
    recentUsers,
    unassignedExpert,
    unquotedCapture,
    postsCount,
  ] = await Promise.all([
    prisma.captureOrder.aggregate({ _sum: { finalPriceGBP: true }, where: { status: 'DELIVERED' } }).catch(() => ({ _sum: { finalPriceGBP: 0 } })),
    prisma.expertProject.aggregate({ _sum: { amountGBP: true }, where: { paidAt: { not: null } } }).catch(() => ({ _sum: { amountGBP: 0 } })),
    prisma.invoice.aggregate({ _sum: { total: true }, where: { status: 'PAID' } }).catch(() => ({ _sum: { total: 0 } })),
    prisma.lead.aggregate({ _sum: { estimatedValue: true }, where: { stage: { notIn: ['CHURNED'] } } }).catch(() => ({ _sum: { estimatedValue: 0 } })),
    prisma.user.count().catch(() => 0),
    prisma.clientProfile.count().catch(() => 0),
    prisma.contributorProfile.count().catch(() => 0),
    prisma.user.count({ where: { createdAt: { gte: since30 } } }).catch(() => 0),
    prisma.contributorProfile.count({ where: { isVerified: false } }).catch(() => 0),
    prisma.captureOrder.count().catch(() => 0),
    prisma.expertProject.count().catch(() => 0),
    prisma.lead.groupBy({ by: ['stage'], _count: { _all: true } }).catch(() => [] as { stage: string; _count: { _all: number } }[]),
    prisma.captureOrder.findMany({ take: 6, orderBy: { createdAt: 'desc' }, include: { clientProfile: true } }).catch(() => []),
    prisma.expertProject.findMany({ take: 6, orderBy: { createdAt: 'desc' }, include: { clientProfile: true } }).catch(() => []),
    prisma.user.findMany({ take: 6, orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.expertProject.findMany({ where: { status: 'SUBMITTED' }, take: 4, include: { clientProfile: true } }).catch(() => []),
    prisma.captureOrder.findMany({ where: { status: 'QUOTE_REQUESTED', createdAt: { lt: new Date(Date.now() - 24 * 3600_000) } }, take: 4, include: { clientProfile: true } }).catch(() => []),
    prisma.researchPost.count({ where: { status: 'PUBLISHED' } }).catch(() => 0),
  ]);

  const revenue = (captureRev._sum.finalPriceGBP || 0) + (expertRev._sum.amountGBP || 0);
  const totalOrders = captureCount + expertCount;

  const recentOrders = [
    ...recentCapture.map((o) => ({ type: 'Capture' as const, code: o.orderCode, company: o.clientProfile.companyName, amount: o.finalPriceGBP || o.quotedPriceGBP || 0, at: o.createdAt, href: `/admin/capture-orders/${o.id}`, status: String(o.status) })),
    ...recentExpert.map((p) => ({ type: 'Expert' as const, code: p.projectCode, company: p.clientProfile.companyName, amount: p.amountGBP || 0, at: p.createdAt, href: `/admin/expert-projects/${p.id}`, status: String(p.status) })),
  ].sort((a, b) => b.at.getTime() - a.at.getTime()).slice(0, 6);

  const stageMap = new Map(leadsByStage.map((l) => [String(l.stage), l._count._all]));
  const pipeline = STAGES.map((s) => ({ label: cap(s.replace('_', ' ').toLowerCase()), value: stageMap.get(s) || 0 }));

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-h2">Site overview</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Super-admin view · traffic, commerce and users · last 30 days</p>
        </div>
        <Badge tone="capture">Super Admin</Badge>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <Kpi label="Unique visitors" value={traffic.uniqueVisitors.toLocaleString()} trend={pctChange(traffic.uniqueVisitors, traffic.prevUnique)} sub="vs prev 30d" />
        <Kpi label="Page views" value={traffic.totalViews.toLocaleString()} trend={pctChange(traffic.totalViews, traffic.prevViews)} sub="vs prev 30d" />
        <Kpi label="Revenue" value={gbp(revenue)} sub="delivered + paid" accent="capture" />
        <Kpi label="Pipeline value" value={gbp(pipelineVal._sum.estimatedValue || 0)} sub="open leads" accent="neutral" />
        <Kpi label="Orders + projects" value={totalOrders.toLocaleString()} sub={`${captureCount} capture · ${expertCount} expert`} accent="neutral" />
        <Kpi label="New signups" value={signups30.toLocaleString()} sub={`${totalUsers} total users`} />
      </div>

      {/* Traffic chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Traffic (30 days)</CardTitle>
            <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-[2px] bg-[var(--expert)] inline-block" /> Page views</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-[2px] inline-block" style={{ background: 'var(--capture)' }} /> Visitors</span>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <TrafficChart daily={traffic.daily} />
          {!traffic.hasData && <p className="text-sm text-[var(--text-tertiary)] mt-3">No traffic recorded yet - data will populate as visitors arrive.</p>}
        </CardBody>
      </Card>

      {/* Traffic breakdowns */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Top pages</CardTitle></CardHeader>
          <CardBody><BarList items={traffic.topPages.map((p) => ({ label: fmtPath(p.path), value: p.views }))} total={traffic.totalViews} /></CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Traffic sources</CardTitle></CardHeader>
          <CardBody><BarList items={traffic.sources.map((s) => ({ label: sourceLabel(s.source), value: s.views }))} total={traffic.totalViews} mode="pct" accent="capture" /></CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Devices</CardTitle></CardHeader>
          <CardBody><BarList items={traffic.devices.map((d) => ({ label: cap(d.device), value: d.views }))} total={traffic.totalViews} mode="pct" /></CardBody>
        </Card>
      </div>

      {/* Commerce + pipeline */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent orders &amp; projects</CardTitle>
              <span className="text-xs text-[var(--text-tertiary)]">Invoiced (paid): {gbp(invoicedPaid._sum.total || 0)}</span>
            </div>
          </CardHeader>
          <CardBody>
            {recentOrders.length === 0 ? <p className="text-sm text-[var(--text-tertiary)]">No orders yet.</p> : (
              <div className="divide-y divide-[var(--border-dim)]">
                {recentOrders.map((o) => (
                  <Link key={o.code} href={o.href} className="flex items-center justify-between py-2.5 text-sm hover:opacity-80">
                    <span className="flex items-center gap-2 min-w-0">
                      <Badge tone={o.type === 'Capture' ? 'capture' : 'expert'}>{o.type}</Badge>
                      <span className="text-[var(--text-primary)] truncate">{o.company}</span>
                      <span className="text-[var(--text-tertiary)] hidden sm:inline">{o.code}</span>
                    </span>
                    <span className="flex items-center gap-3 shrink-0">
                      <span className="text-[var(--text-tertiary)] text-xs">{fmtDate(o.at)}</span>
                      <span className="text-[var(--text-primary)] tabular-nums">{o.amount ? gbp(o.amount) : '-'}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Leads pipeline</CardTitle></CardHeader>
          <CardBody><BarList items={pipeline} total={pipeline.reduce((s, p) => s + p.value, 0)} accent="capture" /></CardBody>
        </Card>
      </div>

      {/* Users + content + recent signups */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>People</CardTitle></CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Clients" value={clients} />
              <Stat label="Contributors" value={contributors} />
              <Stat label="Total users" value={totalUsers} />
              <Stat label="Published posts" value={postsCount} />
            </div>
          </CardBody>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Recent signups</CardTitle></CardHeader>
          <CardBody>
            {recentUsers.length === 0 ? <p className="text-sm text-[var(--text-tertiary)]">No signups yet.</p> : (
              <div className="divide-y divide-[var(--border-dim)]">
                {recentUsers.map((u) => (
                  <div key={u.id} className="flex items-center justify-between py-2.5 text-sm">
                    <span className="text-[var(--text-primary)] truncate">{u.firstName} {u.lastName} <span className="text-[var(--text-tertiary)]">· {u.email}</span></span>
                    <span className="flex items-center gap-3 shrink-0">
                      <Badge tone={u.role === 'ADMIN' ? 'capture' : u.role === 'CONTRIBUTOR' ? 'expert' : 'neutral'}>{u.role.toLowerCase()}</Badge>
                      <span className="text-[var(--text-tertiary)] text-xs">{fmtDate(u.createdAt)}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Operational queues */}
      <div>
        <h2 className="text-label text-[var(--text-tertiary)] mb-3">Needs attention</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader><CardTitle>Projects awaiting assignment</CardTitle></CardHeader>
            <CardBody>
              {unassignedExpert.length === 0 ? <p className="text-sm text-[var(--text-tertiary)]">All caught up.</p> : (
                <ul className="space-y-2">
                  {unassignedExpert.map((p) => (
                    <li key={p.id} className="flex justify-between text-sm gap-2">
                      <Link href={`/admin/expert-projects/${p.id}`} className="text-[var(--text-primary)] hover:text-[var(--expert)] truncate">{p.title}</Link>
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
              {unquotedCapture.length === 0 ? <p className="text-sm text-[var(--text-tertiary)]">All within SLA.</p> : (
                <ul className="space-y-2">
                  {unquotedCapture.map((o) => (
                    <li key={o.id} className="flex justify-between text-sm gap-2">
                      <Link href={`/admin/capture-orders/${o.id}`} className="text-[var(--text-primary)] hover:text-[var(--capture)]">{o.orderCode}</Link>
                      <Badge tone="danger">{o.clientProfile.companyName}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
          <Card>
            <CardHeader><CardTitle>Contributors pending ({pendingContrib})</CardTitle></CardHeader>
            <CardBody>
              <Link href="/admin/contributors" className="text-sm text-[var(--expert)] hover:underline">Review verification queue →</Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-h3 text-[var(--text-primary)] leading-none">{value.toLocaleString()}</div>
      <div className="text-xs text-[var(--text-tertiary)] mt-1">{label}</div>
    </div>
  );
}
