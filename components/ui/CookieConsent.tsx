'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 bg-[var(--bg-card)] border border-[var(--border-bright)] rounded-[12px] p-6 shadow-2xl"
        >
          <h4 className="text-h4 mb-2">Cookies on nxted.ai</h4>
          <p className="text-sm text-[var(--text-secondary)] mb-5">
            We use essential cookies to run the site. With your consent we also use analytics
            cookies to understand how you use it. You can change this any time on{' '}
            <a href="/privacy/cookies" className="underline">
              the cookie policy page
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="expert" onClick={() => save(['essential', 'analytics'])}>
              Accept all
            </Button>
            <Button size="sm" variant="outline" onClick={() => save(['essential'])}>
              Essential only
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
