import React from "react";
import Link from "next/link";
import { Logo } from "@/components/branding/logo";

export function Footer() {
  return (
    <footer className="border-t border-nxted-border bg-nxted-cream">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start">
              <Logo size="md" href="/" />
            </div>
            <p className="text-xs text-nxted-muted">
              Built with Intelligence That Works
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-nxted-muted">
            <Link
              href="/faq"
              className="transition-colors hover:text-brand-primary"
            >
              FAQ
            </Link>
            <span className="text-nxted-border">|</span>
            <Link
              href="/support"
              className="transition-colors hover:text-brand-primary"
            >
              Support
            </Link>
            <span className="text-nxted-border">|</span>
            <Link
              href="https://nxted.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand-primary"
            >
              nxted.ai
            </Link>
            <span className="text-nxted-border">|</span>
            <Link
              href="https://oforo.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand-secondary"
            >
              oforo.ai
            </Link>
            <span className="text-nxted-border">|</span>
            <Link
              href="mailto:hello@oforo.ai"
              className="transition-colors hover:text-nxted-dark"
            >
              hello@oforo.ai
            </Link>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 border-t border-nxted-border pt-6 text-center text-xs text-nxted-muted">
          nxtED AI is a product of OFORO AI | &copy; 2026 OFORO AI. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
