import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });
  const contributor = await prisma.contributorProfile.findUnique({ where: { id } });
  if (!contributor) return new NextResponse('Not found', { status: 404 });
  await prisma.contributorProfile.update({ where: { id }, data: { isVerified: !contributor.isVerified } });
  return NextResponse.redirect(new URL('/admin/contributors', req.url));
}
