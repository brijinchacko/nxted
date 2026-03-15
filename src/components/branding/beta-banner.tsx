"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export function BetaBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-brand-primary/10 border-b border-brand-primary/20 px-4 py-2 text-center text-sm text-nxted-dark">
      <span className="inline-flex items-center gap-2">
        <span className="rounded bg-brand-primary px-1.5 py-0.5 text-xs font-bold text-white">
          BETA
        </span>
        <span>
          This is a beta demo site with many bugs. The real live version is coming soon!
        </span>
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-nxted-muted hover:bg-nxted-surface hover:text-nxted-dark"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
