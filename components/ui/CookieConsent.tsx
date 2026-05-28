'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react/dist/ssr';
import { Button } from './Button';

const STORAGE_KEY = 'nxted-consent-v1';

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setOpen(true);
  }, []);

  function save(types: string[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ types, at: Date.now() }));
    setOpen(false);
    void fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consentGiven: true, consentTypes: types }),
    });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border-default)] bg-[rgba(11,11,12,0.94)] backdrop-blur-xl"
        >
          <div className="container-site py-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <p className="text-xs text-[var(--text-secondary)] flex-1">
              We use essential cookies to run the site. With your consent we also use analytics cookies. Read the{' '}
              <a href="/privacy/cookies" className="underline text-[var(--text-primary)]">cookie policy</a>.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" variant="outline" onClick={() => save(['essential'])}>
                Essential only
              </Button>
              <Button size="sm" variant="expert" onClick={() => save(['essential', 'analytics'])}>
                Accept all
              </Button>
              <button
                onClick={() => save(['essential'])}
                aria-label="Dismiss"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1.5"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
