'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function getVisitorId(): string {
  try {
    let id = localStorage.getItem('nx_vid');
    if (!id) {
      id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('nx_vid', id);
    }
    return id;
  } catch {
    return 'anon';
  }
}

/**
 * First-party, anonymous page-view tracker. Mounted in the public layout only.
 * Sends one beacon per public route change to /api/track. No PII, no cookies.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || last.current === pathname) return;
    last.current = pathname;
    try {
      const body = JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
        visitorId: getVisitorId(),
      });
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* no-op */
    }
  }, [pathname]);

  return null;
}
