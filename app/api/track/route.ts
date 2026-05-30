import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_CONTENT = () => new NextResponse(null, { status: 204 });

const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternal|embedly|quora|pinterest|preview|headless|lighthouse|monitor|curl|wget|python-requests|axios|node-fetch|gptbot|claudebot|perplexity|ahrefs|semrush/i;

function classifySource(referrer: string | null, host: string): string {
  if (!referrer) return 'direct';
  let r: URL;
  try {
    r = new URL(referrer);
  } catch {
    return 'direct';
  }
  const h = r.hostname.replace(/^www\./, '').toLowerCase();
  if (h === host || h.endsWith('nxted.ai')) return 'direct';
  const has = (arr: string[]) => arr.some((s) => h.includes(s));
  if (has(['chatgpt', 'openai', 'perplexity', 'claude', 'anthropic', 'gemini', 'bard', 'copilot', 'grok', 'x.ai']))
    return 'ai';
  if (has(['google', 'bing', 'duckduckgo', 'yahoo', 'ecosia', 'baidu', 'brave', 'qwant']))
    return 'organic';
  if (has(['twitter', 'x.com', 't.co', 'linkedin', 'lnkd', 'facebook', 'fb.com', 'reddit', 'youtube', 'instagram', 'mastodon', 'news.ycombinator']))
    return 'social';
  return 'referral';
}

function classifyDevice(ua: string): string {
  const u = ua.toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(u)) return 'tablet';
  if (/mobi|iphone|android.*mobile|phone|ipod/.test(u)) return 'mobile';
  return 'desktop';
}

export async function POST(req: Request) {
  try {
    const ua = req.headers.get('user-agent') || '';
    if (BOT_RE.test(ua)) return NO_CONTENT();

    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const path = String(body.path || '/').slice(0, 512);
    // Never log private/app areas
    if (/^\/(admin|portal|me|api|auth)(\/|$)/.test(path)) return NO_CONTENT();

    const visitorId = (String(body.visitorId || '').slice(0, 64)) || 'anon';
    const referrer = body.referrer ? String(body.referrer).slice(0, 512) : null;
    const host = (req.headers.get('host') || 'nxted.ai').replace(/^www\./, '').split(':')[0].toLowerCase();

    await prisma.pageView
      .create({
        data: {
          path,
          referrer,
          source: classifySource(referrer, host),
          device: classifyDevice(ua),
          visitorId,
        },
      })
      .catch(() => {});

    return NO_CONTENT();
  } catch {
    return NO_CONTENT();
  }
}
