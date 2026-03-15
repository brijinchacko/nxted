"use client";

import React from "react";
import { Lightbulb, Info, Pencil, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export type ContentCardType = "concept" | "fact" | "practice" | "recap";

interface ContentCardProps {
  type: ContentCardType;
  content: string;
}

const typeConfig: Record<
  ContentCardType,
  { label: string; icon: React.ElementType; accent: string; bg: string }
> = {
  concept: {
    label: "Concept",
    icon: Lightbulb,
    accent: "text-brand-primary",
    bg: "border-brand-primary/20 bg-brand-primary/5",
  },
  fact: {
    label: "Did You Know?",
    icon: Info,
    accent: "text-blue-400",
    bg: "border-blue-400/20 bg-blue-400/5",
  },
  practice: {
    label: "Practice",
    icon: Pencil,
    accent: "text-orange-400",
    bg: "border-orange-400/20 bg-orange-400/5",
  },
  recap: {
    label: "Recap",
    icon: RotateCcw,
    accent: "text-green-400",
    bg: "border-green-400/20 bg-green-400/5",
  },
};

export function ContentCard({ type, content }: ContentCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-xl border p-6 transition-all duration-200",
        config.bg
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon className={cn("h-5 w-5", config.accent)} />
        <span className={cn("text-sm font-semibold", config.accent)}>
          {config.label}
        </span>
      </div>
      <p className="leading-relaxed text-white/90">{content}</p>
    </div>
  );
}
