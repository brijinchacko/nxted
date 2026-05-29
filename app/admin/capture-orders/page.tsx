import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { formatGBP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function CaptureAdminList() {
  const orders = await prisma.captureOrder.findMany({
    include: { clientProfile: true },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);

  return (
    <div className="max-w-6xl">
      <h1 className="text-h2 mb-8">Capture orders</h1>
      <div className="border border-[var(--border-default)] rounded-[12px] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-card)] border-b border-[var(--border-default)] text-left">
            <tr>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Order</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Client</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Skill / Level</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Hours</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Status</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Quote</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.length ? orders.map((o) => (
              <tr key={o.id} className="border-b border-[var(--border-dim)] last:border-0">
                <td className="p-4 font-mono text-xs">{o.orderCode}</td>
                <td className="p-4 text-[var(--text-secondary)]">{o.clientProfile.companyName}</td>
                <td className="p-4 text-[var(--text-secondary)]">{o.skillCategory} · L{o.level.replace('L', '').split('_')[0]}</td>
                <td className="p-4 text-[var(--text-secondary)]">{o.hoursRequested}</td>
                <td className="p-4"><Badge tone="capture">{o.status.replace(/_/g, ' ')}</Badge></td>
                <td className="p-4">{o.quotedPriceGBP ? formatGBP(o.quotedPriceGBP) : '-'}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/capture-orders/${o.id}`} className="text-[var(--capture)] hover:underline text-sm">Open →</Link>
                </td>
              </tr>
            )) : (<tr><td colSpan={7} className="p-8 text-center text-[var(--text-muted)]">No orders yet.</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
