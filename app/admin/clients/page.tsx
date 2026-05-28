import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ClientsPage() {
  const clients = await prisma.clientProfile.findMany({
    include: { user: true, _count: { select: { expertProjects: true, captureOrders: true } } },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);

  return (
    <div className="max-w-6xl">
      <h1 className="text-h2 mb-8">Clients</h1>
      <div className="border border-[var(--border-default)] rounded-[12px] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-card)] border-b border-[var(--border-default)] text-left">
            <tr>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Company</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Contact</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Country</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Expert</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Capture</th>
            </tr>
          </thead>
          <tbody>
            {clients.length ? clients.map((c) => (
              <tr key={c.id} className="border-b border-[var(--border-dim)] last:border-0">
                <td className="p-4 text-[var(--text-primary)] font-medium">{c.companyName}</td>
                <td className="p-4 text-[var(--text-secondary)]">{c.user.firstName} {c.user.lastName} · {c.user.email}</td>
                <td className="p-4 text-[var(--text-secondary)]">{c.country}</td>
                <td className="p-4 text-[var(--text-secondary)]">{c._count.expertProjects}</td>
                <td className="p-4 text-[var(--text-secondary)]">{c._count.captureOrders}</td>
              </tr>
            )) : (<tr><td colSpan={5} className="p-8 text-center text-[var(--text-muted)]">No clients yet.</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
