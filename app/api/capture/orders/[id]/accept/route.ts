import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user.id) return new NextResponse('Unauthorized', { status: 401 });
  const client = await prisma.clientProfile.findUnique({ where: { userId: session.user.id }, select: { id: true } });
  const order = await prisma.captureOrder.findFirst({ where: { id, clientProfileId: client?.id } });
  if (!order || !order.quotedPriceGBP) return new NextResponse('Not quoted', { status: 400 });

  if (!process.env.STRIPE_SECRET_KEY) {
    await prisma.captureOrder.update({ where: { id: order.id }, data: { status: 'CONFIRMED' } });
    return NextResponse.redirect(new URL(`/portal/capture/orders/${order.id}`, process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'));
  }

  const depositPence = Math.round(order.quotedPriceGBP * 0.5 * 100);
  const checkout = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'gbp',
        product_data: { name: `Capture deposit · ${order.orderCode}` },
        unit_amount: depositPence,
      },
      quantity: 1,
    }],
    customer_email: session.user.email!,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/capture/orders/${order.id}?paid=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/capture/orders/${order.id}`,
    metadata: { orderId: order.id, kind: 'capture_deposit' },
  });
  return NextResponse.redirect(checkout.url!);
}
