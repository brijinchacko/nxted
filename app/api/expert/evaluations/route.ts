import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const verdictSchema = z.object({
  outputId: z.string(),
  result: z.enum(['CORRECT', 'PARTIALLY_CORRECT', 'INCORRECT', 'UNSAFE', 'OUT_OF_SCOPE']),
  confidence: z.number().int().min(1).max(5),
  errorCategories: z.array(z.string()).default([]),
  errorDescription: z.string().optional().nullable(),
  correctedVersion: z.string().optional().nullable(),
  severityScore: z.number().int().min(1).max(5),
});

const schema = z.object({
  taskId: z.string(),
  verdicts: z.array(verdictSchema).min(1),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user.id) return new NextResponse('Unauthorized', { status: 401 });
  const contributor = await prisma.contributorProfile.findUnique({ where: { userId: session.user.id } });
  if (!contributor) return new NextResponse('No contributor profile', { status: 403 });

  const body = (await req.json()) as unknown;
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });

  const task = await prisma.evaluationTask.findUnique({ where: { id: parsed.data.taskId } });
  if (!task || task.contributorId !== contributor.id) return new NextResponse('Forbidden', { status: 403 });

  await prisma.$transaction(async (tx) => {
    for (const v of parsed.data.verdicts) {
      await tx.outputEvaluation.upsert({
        where: { outputId_taskId: { outputId: v.outputId, taskId: task.id } },
        create: {
          outputId: v.outputId,
          taskId: task.id,
          contributorId: contributor.id,
          result: v.result,
          confidence: v.confidence,
          errorCategories: v.errorCategories as never,
          errorDescription: v.errorDescription || null,
          correctedVersion: v.correctedVersion || null,
          severityScore: v.severityScore,
        },
        update: {
          result: v.result,
          confidence: v.confidence,
          errorCategories: v.errorCategories as never,
          errorDescription: v.errorDescription || null,
          correctedVersion: v.correctedVersion || null,
          severityScore: v.severityScore,
        },
      });
    }
    await tx.evaluationTask.update({
      where: { id: task.id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        outputsCompleted: parsed.data.verdicts.length,
      },
    });
    await tx.contributorProfile.update({
      where: { id: contributor.id },
      data: { totalTasks: { increment: 1 } },
    });
  });

  return NextResponse.json({ ok: true });
}
