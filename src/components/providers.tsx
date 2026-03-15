"use client";

import React from "react";

const hasClerkKey =
  typeof window !== "undefined"
    ? !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("REPLACE_ME")
    : false;

export function Providers({ children }: { children: React.ReactNode }) {
  if (!hasClerkKey) {
    return <>{children}</>;
  }

  // Dynamically import ClerkProvider only when key is available
  const ClerkProviderLazy = React.lazy(() =>
    import("@clerk/nextjs").then((mod) => ({
      default: mod.ClerkProvider,
    }))
  );

  return (
    <React.Suspense fallback={<>{children}</>}>
      <ClerkProviderLazy>{children}</ClerkProviderLazy>
    </React.Suspense>
  );
}
