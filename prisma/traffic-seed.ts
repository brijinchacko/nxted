import { Prisma, type PrismaClient } from '@prisma/client';

// Realistic demo web-analytics history. Rows are marked sessionId='demo' so a
// reseed clears and regenerates only the demo data and never touches real
// tracked page views.

const PATHS: [string, number][] = [
  ['/', 30],
  ['/capture', 16],
  ['/expert', 11],
  ['/pricing', 9],
  ['/trust', 6],
  ['/research', 5],
  ['/case-studies', 4],
  ['/how-it-works', 3],
  ['/research/best-egocentric-data-providers-for-robotics', 5],
  ['/research/what-is-egocentric-data', 4],
  ['/research/what-is-physical-ai', 3],
  ['/research/what-robot-training-data-costs', 3],
  ['/research/scale-ai-appen-alternatives-physical-ai-data', 3],
  ['/research/lerobot-vs-rlds-vs-hdf5', 2],
  ['/research/rlhf-data-providers-compared', 2],
  ['/research/industrial-manipulation-datasets', 2],
];

const SOURCES: [string, number][] = [
  ['organic', 35],
  ['direct', 25],
  ['ai', 15],
  ['referral', 13],
  ['social', 12],
];

const DEVICES: [string, number][] = [
  ['desktop', 58],
  ['mobile', 36],
  ['tablet', 6],
];

const REFERRERS: Record<string, string[]> = {
  organic: ['https://www.google.com/', 'https://www.bing.com/', 'https://duckduckgo.com/'],
  ai: ['https://chatgpt.com/', 'https://www.perplexity.ai/', 'https://gemini.google.com/'],
  referral: ['https://github.com/', 'https://huggingface.co/', 'https://news.ycombinator.com/'],
  social: ['https://www.linkedin.com/', 'https://x.com/', 'https://www.reddit.com/'],
  direct: [],
};

function weighted<T>(arr: [T, number][]): T {
  const total = arr.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [v, w] of arr) {
    r -= w;
    if (r <= 0) return v;
  }
  return arr[0][0];
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function seedTraffic(prisma: PrismaClient, days = 30): Promise<number> {
  await prisma.pageView.deleteMany({ where: { sessionId: 'demo' } });

  // A fixed visitor pool so unique/returning ratios look realistic.
  const visitors = Array.from(
    { length: 1400 },
    () => 'v_' + Math.random().toString(36).slice(2, 12),
  );

  const rows: Prisma.PageViewCreateManyInput[] = [];
  const now = Date.now();

  for (let d = days - 1; d >= 0; d--) {
    const date = new Date(now - d * 86_400_000);
    const dow = date.getDay();
    const weekend = dow === 0 || dow === 6 ? 0.6 : 1;
    const trend = 1 + ((days - d) / days) * 0.5; // ~50% growth across the window
    const base = 70 * weekend * trend;
    const count = Math.max(15, Math.round(base * (0.8 + Math.random() * 0.4)));

    for (let i = 0; i < count; i++) {
      const source = weighted(SOURCES);
      const refs = REFERRERS[source];
      const createdAt = new Date(date);
      createdAt.setHours(
        6 + Math.floor(Math.random() * 16),
        Math.floor(Math.random() * 60),
        Math.floor(Math.random() * 60),
        0,
      );
      rows.push({
        path: weighted(PATHS),
        source,
        device: weighted(DEVICES),
        referrer: refs.length ? pick(refs) : null,
        visitorId: pick(visitors),
        sessionId: 'demo',
        createdAt,
      });
    }
  }

  for (let i = 0; i < rows.length; i += 1000) {
    await prisma.pageView.createMany({ data: rows.slice(i, i + 1000) });
  }
  return rows.length;
}
