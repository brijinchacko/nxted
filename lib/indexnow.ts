// IndexNow: instant indexing for Bing, Yandex and partners.
// The key is also served as a static file at /<key>.txt for verification.
export const INDEXNOW_KEY = '7f3a9c2e8b1d4056a9e7c3f1b2d8e6a4';

export async function submitToIndexNow(urls: string[]): Promise<{ ok: boolean; status: number; submitted: number }> {
  const host = (process.env.NEXT_PUBLIC_APP_URL || 'https://nxted.ai')
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');
  if (!urls.length) return { ok: true, status: 200, submitted: 0 };
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
        urlList: urls.slice(0, 10000),
      }),
    });
    return { ok: res.ok, status: res.status, submitted: urls.length };
  } catch {
    return { ok: false, status: 0, submitted: urls.length };
  }
}
