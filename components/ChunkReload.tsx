'use client';

import { useEffect } from 'react';

/**
 * Resilience for deploys: when a new build replaces content-hashed JS/CSS
 * chunks, a browser still holding the previous build can fail to fetch a chunk
 * ("ChunkLoadError" / "Loading chunk ... failed") and surface a client-side
 * exception. This listens for those specific failures and reloads the page once
 * (rate-limited) so the user transparently gets the new build.
 */
export function ChunkReload() {
  useEffect(() => {
    const KEY = 'nx_chunk_reload_at';
    const RE =
      /ChunkLoadError|Loading chunk [\w-]+ failed|Loading CSS chunk|Failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed/i;

    const isChunkError = (v: unknown): boolean => {
      if (!v) return false;
      const s = typeof v === 'string' ? v : `${(v as Error)?.name || ''} ${(v as Error)?.message || ''}`;
      return RE.test(s);
    };

    const reloadOnce = () => {
      try {
        const last = Number(sessionStorage.getItem(KEY) || 0);
        // Avoid reload loops: at most once per 15s.
        if (Date.now() - last < 15_000) return;
        sessionStorage.setItem(KEY, String(Date.now()));
      } catch {
        /* ignore storage errors and still reload */
      }
      window.location.reload();
    };

    const onError = (e: ErrorEvent) => {
      if (isChunkError(e.message) || isChunkError(e.error)) reloadOnce();
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      if (isChunkError(e.reason)) reloadOnce();
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  return null;
}
