import { notFound, redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { EvaluationInterface } from '@/components/expert/EvaluationInterface';

export const dynamic = 'force-dynamic';

export default async function TaskDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user.id) redirect('/auth/login');

  const contributor = await prisma.contributorProfile.findUnique({ where: { userId: session.user.id } });
  if (!contributor) redirect('/me/dashboard');

  const task = await prisma.evaluationTask.findUnique({
    where: { id },
    include: { project: { include: { outputs: { orderBy: { outputIndex: 'asc' } } } } },
  });
  if (!task || task.contributorId !== contributor.id) notFound();

  if (task.status === 'PENDING') {
    await prisma.evaluationTask.update({
      where: { id: task.id },
      data: { status: 'IN_PROGRESS', startedAt: new Date() },
    });
  }

  return (
    <EvaluationInterface
      taskId={task.id}
      projectTitle={task.project.title}
      outputs={task.project.outputs.map((o) => ({
        id: o.id,
        outputIndex: o.outputIndex,
        prompt: o.prompt,
        aiResponse: o.aiResponse,
        groundTruth: o.groundTruth,
        contextNotes: o.contextNotes,
      }))}
      rubric={task.project.rubricNotes || undefined}
    />
  );
}
