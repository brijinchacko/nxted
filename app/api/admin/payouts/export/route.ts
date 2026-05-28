import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });

  const payouts = await prisma.contributorPayout.findMany({
    include: { contributor: { include: { user: true } } },
    orderBy: { createdAt: 'desc' },
  });

  const rows = [
    ['period', 'contributor', 'email', 'amount_gbp', 'status', 'paymentRef', 'paidAt'].join(','),
    ...payouts.map((p) =>
      [
        p.period,
        `"${p.contributor.user.firstName} ${p.contributor.user.lastName}"`,
        p.contributor.user.email,
        p.amount.toFixed(2),
        p.status,
        p.paymentRef || '',
        p.paidAt?.toISOString() || '',
      ].join(','),
    ),
  ].join('\n');

  return new NextResponse(rows, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="nxted-payouts-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
