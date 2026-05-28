import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const schema = z.object({ coverNote: z.string().max(2000).optional() });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user.id) return new NextResponse('Unauthorized', { status: 401 });
  const contributor = await prisma.contributorProfile.findUnique({ where: { userId: session.user.id } });
  if (!contributor) return new NextResponse('No contributor profile', { status: 403 });

  const { id } = await params;
  const project = await prisma.marketplaceProject.findUnique({ where: { id } });
  if (!project || project.status !== 'OPEN') return new NextResponse('Project not open', { status: 400 });

  const seatsLeft = project.seatsAvailable - project.seatsFilled;
  if (seatsLeft <= 0) return new NextResponse('No seats remaining', { status: 400 });

  const body = (await req.json().catch(() => ({}))) as unknown;
  const parsed = schema.safeParse(body);
  const coverNote = parsed.success ? parsed.data.coverNote || null : null;

  try {
    const application = await prisma.projectApplication.create({
      data: {
        projectId: project.id,
        contributorId: contributor.id,
        coverNote,
        status: 'APPLIED',
      },
    });
    return NextResponse.json({ id: application.id });
  } catch (err) {
    if ((err as { code?: string }).code === 'P2002') {
      return new NextResponse('Already applied', { status: 409 });
    }
    throw err;
  }
}
