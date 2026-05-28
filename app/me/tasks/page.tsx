import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ExpertTaskCard } from '@/components/expert/ExpertTaskCard';

export const dynamic = 'force-dynamic';

export default async function TasksPage() {
  const session = await auth();
  const contributor = session?.user.id
    ? await prisma.contributorProfile.findUnique({ where: { userId: session.user.id } })
    : null;

  const tasks = contributor
    ? await prisma.evaluationTask.findMany({
        where: { contributorId: contributor.id, status: { in: ['PENDING', 'IN_PROGRESS'] } },
        include: { project: true },
        orderBy: { assignedAt: 'desc' },
      })
    : [];

  return (
    <div className="max-w-5xl">
      <h1 className="text-h2 mb-8">Your tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-[var(--text-muted)]">No assigned tasks right now. Admins assign tasks based on your expertise.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tasks.map((t) => (
            <ExpertTaskCard
              key={t.id}
              id={t.id}
              title={t.project.title}
              domain={t.project.aiDomain}
              outputsTotal={t.outputsTotal}
              estMinutes={Math.round(t.outputsTotal * 3)}
              rate={t.payoutAmount || 0}
              status={t.status === 'PENDING' ? 'available' : 'in-progress'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
