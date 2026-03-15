"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const hasClerkKey =
  typeof window !== "undefined"
    ? !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("REPLACE_ME")
    : false;

function ClerkSignIn() {
  const { SignIn } = require("@clerk/nextjs");
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: "mx-auto",
          card: "bg-nxted-card border border-nxted-border",
        },
      }}
    />
  );
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-nxted-dark">
      {hasClerkKey ? (
        <ClerkSignIn />
      ) : (
        <Card className="w-full max-w-md bg-nxted-card border-nxted-border">
          <CardContent className="pt-6 text-center space-y-4">
            <h1 className="text-2xl font-heading font-bold text-nxted-dark">Sign In</h1>
            <p className="text-nxted-muted text-sm">
              Authentication is not configured yet. Please set up Clerk to enable sign in.
            </p>
            <Button asChild variant="secondary">
              <Link href="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
