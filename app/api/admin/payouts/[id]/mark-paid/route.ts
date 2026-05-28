import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });
  const fd = await req.formData();
  const paymentRef = String(fd.get('paymentRef') || '');
  await prisma.contributorPayout.update({
    where: { id },
    data: { status: 'PAID', paidAt: new Date(), paymentRef, paymentMethod: 'BANK' },
  });
  return NextResponse.redirect(new URL('/admin/payouts', req.url));
}
