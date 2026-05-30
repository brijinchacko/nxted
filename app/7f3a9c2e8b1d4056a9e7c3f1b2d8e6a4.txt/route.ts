import { INDEXNOW_KEY } from '@/lib/indexnow';

export const dynamic = 'force-static';

// IndexNow ownership verification file: must return exactly the key.
export function GET() {
  return new Response(INDEXNOW_KEY, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
