import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ id: string; appId: string }> }) {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });
  const { id, appId } = await params;
  await prisma.projectApplication.update({
    where: { id: appId },
    data: {
      status: 'OFFER_SENT',
      decidedAt: new Date(),
      offerExpiresAt: new Date(Date.now() + 5 * 86400000),
    },
  });
  return NextResponse.redirect(new URL(`/admin/projects/${id}`, req.url));
}
