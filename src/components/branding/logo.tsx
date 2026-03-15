"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
}

const sizes = {
  sm: { icon: 20, text: "text-lg" },
  md: { icon: 24, text: "text-xl" },
  lg: { icon: 32, text: "text-3xl" },
};

export function Logo({ size = "md", href = "/" }: LogoProps) {
  const s = sizes[size];

  const content = (
    <span className="flex items-center gap-2">
      <Image
        src="/icon.svg"
        alt="nxtED icon"
        width={s.icon}
        height={s.icon}
        className="flex-shrink-0"
      />
      <span className={`font-heading font-bold ${s.text}`}>
        <span className="text-nxted-dark">nxt</span>
        <span className="text-brand-primary">ED</span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center gap-2">
        {content}
      </Link>
    );
  }

  return content;
}
