import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendMail } from '@/lib/resend';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });

  const fd = await req.formData();
  const quotedPriceGBP = Number(fd.get('quotedPriceGBP'));
  if (!quotedPriceGBP) return new NextResponse('Missing price', { status: 400 });

  const order = await prisma.captureOrder.update({
    where: { id },
    data: { quotedPriceGBP, status: 'QUOTED' },
    include: { clientProfile: { include: { user: true } } },
  });

  await prisma.notification.create({
    data: {
      userId: order.clientProfile.user.id,
      title: 'Capture quote ready',
      body: `Your quote for ${order.orderCode} is £${quotedPriceGBP.toLocaleString('en-GB')}.`,
      link: `/portal/capture/orders/${order.id}`,
    },
  });

  await sendMail({
    to: order.clientProfile.user.email,
    subject: `Quote for your Nxted Capture order - ${order.orderCode}`,
    html: `<p>Hi ${order.clientProfile.user.firstName},</p>
<p>Your quote for <strong>${order.orderCode}</strong> is <strong>£${quotedPriceGBP.toLocaleString('en-GB')}</strong>.</p>
<p><a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/capture/orders/${order.id}">Review and accept →</a></p>`,
  }).catch(() => null);

  return NextResponse.redirect(new URL(`/admin/capture-orders/${id}`, req.url));
}
