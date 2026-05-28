import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripe, PRICE_IDS } from '@/lib/stripe';
import { generateCode } from '@/lib/utils';

const schema = z.object({
  product: z.enum(['TEST_KIT', 'QUICK_SPRINT', 'RETAINER_STARTER', 'RETAINER_GROWTH', 'RETAINER_SCALE']),
  title: z.string().min(1),
  aiDomain: z.string().min(1),
  aiUseCase: z.string().min(1),
  whatCorrectMeans: z.string().min(1),
  rubricNotes: z.string().optional().nullable(),
  industry: z.string().optional().nullable(),
  outputsCsv: z.string().min(1),
});

const PRODUCT_TO_PRICE: Record<string, string> = {
  QUICK_SPRINT: PRICE_IDS.expertQuick,
  RETAINER_STARTER: PRICE_IDS.expertStarter,
  RETAINER_GROWTH: PRICE_IDS.expertGrowth,
  RETAINER_SCALE: PRICE_IDS.expertScale,
};

const PRODUCT_AMOUNT_GBP: Record<string, number> = {
  TEST_KIT: 0,
  QUICK_SPRINT: 249,
  RETAINER_STARTER: 1500,
  RETAINER_GROWTH: 3500,
  RETAINER_SCALE: 5000,
};

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user.id) return new NextResponse('Unauthorized', { status: 401 });
  const client = await prisma.clientProfile.findUnique({ where: { userId: session.user.id } });
  if (!client) return new NextResponse('No client profile', { status: 400 });

  const body = (await req.json()) as unknown;
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });
  const data = parsed.data;

  const lines = data.outputsCsv.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const outputs = lines.map((line, i) => {
    const [prompt, ...rest] = line.split('|');
    return {
      outputIndex: i,
      prompt: (prompt || '').trim(),
      aiResponse: rest.join('|').trim(),
    };
  });

  const projectCode = generateCode('EXP');
  const project = await prisma.expertProject.create({
    data: {
      projectCode,
      clientProfileId: client.id,
      title: data.title,
      aiDomain: data.aiDomain,
      aiUseCase: data.aiUseCase,
      whatCorrectMeans: data.whatCorrectMeans,
      rubricNotes: data.rubricNotes,
      industry: data.industry,
      projectType: data.product,
      status: data.product === 'TEST_KIT' ? 'SUBMITTED' : 'DRAFT',
      totalOutputs: outputs.length,
      amountGBP: PRODUCT_AMOUNT_GBP[data.product] || 0,
      outputs: { create: outputs },
    },
  });

  if (data.product === 'TEST_KIT') {
    return NextResponse.json({ id: project.id });
  }

  const priceId = PRODUCT_TO_PRICE[data.product];
  if (!priceId || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ id: project.id });
  }

  const mode = data.product === 'QUICK_SPRINT' ? 'payment' : 'subscription';
  const checkout = await stripe.checkout.sessions.create({
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: session.user.email!,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/expert/${project.id}?paid=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/expert/new`,
    metadata: { projectId: project.id, kind: 'expert_project' },
  });

  await prisma.expertProject.update({
    where: { id: project.id },
    data: { stripePaymentId: checkout.id },
  });

  return NextResponse.json({ id: project.id, checkoutUrl: checkout.url });
}
