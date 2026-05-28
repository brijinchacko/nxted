import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return new NextResponse('Missing signature', { status: 400 });

  const buf = Buffer.from(await req.arrayBuffer());
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, secret);
  } catch (err) {
    console.error('Stripe webhook signature error:', err);
    return new NextResponse('Invalid signature', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const kind = session.metadata?.kind;
    if (kind === 'expert_project' && session.metadata?.projectId) {
      await prisma.expertProject.update({
        where: { id: session.metadata.projectId },
        data: { status: 'SUBMITTED', paidAt: new Date(), stripePaymentId: session.id },
      });
    }
    if (kind === 'capture_deposit' && session.metadata?.orderId) {
      await prisma.captureOrder.update({
        where: { id: session.metadata.orderId },
        data: { status: 'CONFIRMED' },
      });
    }
  }

  return NextResponse.json({ received: true });
}

export const runtime = 'nodejs';
