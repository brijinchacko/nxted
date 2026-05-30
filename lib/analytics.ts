import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export interface DailyPoint {
  date: string;
  views: number;
  visitors: number;
}

export interface TrafficStats {
  totalViews: number;
  prevViews: number;
  uniqueVisitors: number;
  prevUnique: number;
  daily: DailyPoint[];
  topPages: { path: string; views: number }[];
  sources: { source: string; views: number }[];
  devices: { device: string; views: number }[];
  hasData: boolean;
}

const EMPTY: TrafficStats = {
  totalViews: 0,
  prevViews: 0,
  uniqueVisitors: 0,
  prevUnique: 0,
  daily: [],
  topPages: [],
  sources: [],
  devices: [],
  hasData: false,
};

export async function getTrafficStats(days = 30): Promise<TrafficStats> {
  const dayMs = 86_400_000;
  const now = new Date();
  const since = new Date(now.getTime() - days * dayMs);
  const prevSince = new Date(now.getTime() - 2 * days * dayMs);

  try {
    const [totalViews, prevViews, uniqRows, prevUniqRows, dailyRows, topPages, sources, devices] =
      await Promise.all([
        prisma.pageView.count({ where: { createdAt: { gte: since } } }),
        prisma.pageView.count({ where: { createdAt: { gte: prevSince, lt: since } } }),
        prisma.$queryRaw<{ c: number }[]>(
          Prisma.sql`SELECT COUNT(DISTINCT "visitorId")::int AS c FROM "PageView" WHERE "createdAt" >= ${since}`,
        ),
        prisma.$queryRaw<{ c: number }[]>(
          Prisma.sql`SELECT COUNT(DISTINCT "visitorId")::int AS c FROM "PageView" WHERE "createdAt" >= ${prevSince} AND "createdAt" < ${since}`,
        ),
        prisma.$queryRaw<{ day: string; views: number; visitors: number }[]>(
          Prisma.sql`SELECT to_char(date_trunc('day', "createdAt"), 'YYYY-MM-DD') AS day, COUNT(*)::int AS views, COUNT(DISTINCT "visitorId")::int AS visitors FROM "PageView" WHERE "createdAt" >= ${since} GROUP BY 1 ORDER BY 1`,
        ),
        prisma.pageView.groupBy({
          by: ['path'],
          _count: { _all: true },
          where: { createdAt: { gte: since } },
          orderBy: { _count: { path: 'desc' } },
          take: 8,
        }),
        prisma.pageView.groupBy({
          by: ['source'],
          _count: { _all: true },
          where: { createdAt: { gte: since } },
          orderBy: { _count: { source: 'desc' } },
        }),
        prisma.pageView.groupBy({
          by: ['device'],
          _count: { _all: true },
          where: { createdAt: { gte: since } },
          orderBy: { _count: { device: 'desc' } },
        }),
      ]);

    const map = new Map(dailyRows.map((r) => [r.day, r]));
    const daily: DailyPoint[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const key = new Date(now.getTime() - i * dayMs).toISOString().slice(0, 10);
      const row = map.get(key);
      daily.push({ date: key, views: row?.views ?? 0, visitors: row?.visitors ?? 0 });
    }

    return {
      totalViews,
      prevViews,
      uniqueVisitors: uniqRows[0]?.c ?? 0,
      prevUnique: prevUniqRows[0]?.c ?? 0,
      daily,
      topPages: topPages.map((p) => ({ path: p.path, views: p._count._all })),
      sources: sources.map((s) => ({ source: s.source, views: s._count._all })),
      devices: devices.map((d) => ({ device: d.device, views: d._count._all })),
      hasData: totalViews > 0,
    };
  } catch {
    return EMPTY;
  }
}

export function pctChange(curr: number, prev: number): number | null {
  if (!prev) return null;
  return Math.round(((curr - prev) / prev) * 100);
}
