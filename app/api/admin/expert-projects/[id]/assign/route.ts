import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });

  const fd = await req.formData();
  const contributorId = String(fd.get('contributorId'));
  const payoutAmount = Number(fd.get('payoutAmount'));
  const project = await prisma.expertProject.findUnique({ where: { id }, include: { outputs: true } });
  if (!project) return new NextResponse('Not found', { status: 404 });

  await prisma.evaluationTask.create({
    data: {
      projectId: project.id,
      contributorId,
      outputsTotal: project.outputs.length,
      payoutAmount,
      status: 'PENDING',
    },
  });
  await prisma.expertProject.update({
    where: { id: project.id },
    data: { status: 'CONTRIBUTORS_ASSIGNED' },
  });
  return NextResponse.redirect(new URL(`/admin/expert-projects/${id}`, req.url));
}
