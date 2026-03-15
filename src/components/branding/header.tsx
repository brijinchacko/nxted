"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const hasClerkKey =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("REPLACE_ME");

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Courses", href: "/courses" },
  { label: "Progress", href: "/progress" },
];

function AuthButtons() {
  // Only imported when Clerk is available
  const { SignInButton, UserButton, useUser } = require("@clerk/nextjs");
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return isSignedIn ? (
    <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
  ) : (
    <SignInButton mode="modal">
      <Button size="sm">Sign In</Button>
    </SignInButton>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-nxted-border bg-nxted-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold text-brand-primary">
            nxtED
          </span>
          <span className="text-sm font-medium text-nxted-muted">AI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-nxted-muted transition-colors hover:bg-nxted-surface hover:text-nxted-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth + mobile toggle */}
        <div className="flex items-center gap-3">
          {hasClerkKey ? (
            <AuthButtons />
          ) : (
            <Link href="/sign-in">
              <Button size="sm">Sign In</Button>
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-lg p-2 text-nxted-muted hover:bg-nxted-surface hover:text-nxted-dark md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "overflow-hidden border-t border-nxted-border transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-60" : "max-h-0 border-t-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-nxted-muted transition-colors hover:bg-nxted-surface hover:text-nxted-dark"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
