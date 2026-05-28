import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatGBP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function PayoutsPage() {
  const payouts = await prisma.contributorPayout.findMany({
    include: { contributor: { include: { user: true } } },
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
  }).catch(() => []);

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-h2">Payouts</h1>
        <a href="/api/admin/payouts/export" className="text-sm text-[var(--expert)] hover:underline">Export CSV →</a>
      </div>
      <div className="border border-[var(--border-default)] rounded-[12px] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-card)] border-b border-[var(--border-default)] text-left">
            <tr>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Contributor</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Period</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Amount</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Status</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Reference</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {payouts.length ? payouts.map((p) => (
              <tr key={p.id} className="border-b border-[var(--border-dim)] last:border-0">
                <td className="p-4 text-[var(--text-primary)]">{p.contributor.user.firstName} {p.contributor.user.lastName}</td>
                <td className="p-4 text-[var(--text-secondary)]">{p.period}</td>
                <td className="p-4">{formatGBP(p.amount)}</td>
                <td className="p-4"><Badge tone={p.status === 'PAID' ? 'success' : 'warning'}>{p.status}</Badge></td>
                <td className="p-4 text-xs text-[var(--text-muted)]">{p.paymentRef || '—'}</td>
                <td className="p-4 text-right">
                  {p.status === 'PENDING' && (
                    <form action={`/api/admin/payouts/${p.id}/mark-paid`} method="POST" className="flex gap-2 items-center justify-end">
                      <input name="paymentRef" placeholder="ref" required className="w-32 h-8 px-2 text-xs rounded bg-[var(--bg-input)] border border-[var(--border-default)]" />
                      <Button type="submit" size="sm">Mark paid</Button>
                    </form>
                  )}
                </td>
              </tr>
            )) : (<tr><td colSpan={6} className="p-8 text-center text-[var(--text-muted)]">No payouts yet.</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
