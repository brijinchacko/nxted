import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });
  const fd = await req.formData();
  await prisma.captureOrder.update({ where: { id }, data: { coordinatorNotes: String(fd.get('coordinatorNotes') || '') } });
  return NextResponse.redirect(new URL(`/admin/capture-orders/${id}`, req.url));
}
