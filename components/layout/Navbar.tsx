'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from '@phosphor-icons/react/dist/ssr';
import { Logo } from './Logo';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-200',
          scrolled
            ? 'bg-[rgba(11,11,12,0.9)] backdrop-blur-xl border-b border-[var(--border-dim)]'
            : 'bg-transparent',
        )}
      >
        <div className="container-site h-[72px] flex items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button href="/auth/login" variant="ghost" size="sm">
              Sign In
            </Button>
            <Button href="/auth/register" variant="expert" size="sm">
              Get Started
            </Button>
          </div>

          <button
            className="lg:hidden text-[var(--text-primary)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border-dim)] lg:hidden"
          >
            <div className="container-site py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-[var(--text-primary)] py-2"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-4 border-t border-[var(--border-dim)]">
                <Button href="/auth/login" variant="outline" size="sm" fullWidth>
                  Sign In
                </Button>
                <Button href="/auth/register" variant="expert" size="sm" fullWidth>
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
