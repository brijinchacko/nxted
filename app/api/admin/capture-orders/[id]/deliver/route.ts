import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendMail } from '@/lib/resend';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });

  const fd = await req.formData();
  const deliveryUrl = String(fd.get('deliveryUrl') || '');
  if (!deliveryUrl) return new NextResponse('Missing URL', { status: 400 });

  const order = await prisma.captureOrder.update({
    where: { id },
    data: { deliveryUrl, status: 'DELIVERED', deliveredAt: new Date() },
    include: { clientProfile: { include: { user: true } } },
  });

  await prisma.notification.create({
    data: {
      userId: order.clientProfile.user.id,
      title: 'Dataset delivered',
      body: `${order.orderCode} is ready for download.`,
      link: `/portal/capture/orders/${order.id}`,
    },
  });

  await sendMail({
    to: order.clientProfile.user.email,
    subject: `Your Nxted Capture dataset is ready — ${order.orderCode}`,
    html: `<p>Hi ${order.clientProfile.user.firstName},</p>
<p>Your dataset for <strong>${order.orderCode}</strong> is ready.</p>
<p><a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/capture/orders/${order.id}">Download from the portal →</a></p>`,
  }).catch(() => null);

  return NextResponse.redirect(new URL(`/admin/capture-orders/${id}`, req.url));
}
