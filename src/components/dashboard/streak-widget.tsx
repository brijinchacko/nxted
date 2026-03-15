"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StreakWidgetProps {
  streakCount: number;
  bestStreak: number;
  lastStudyDate: string | null;
}

export function StreakWidget({
  streakCount,
  bestStreak,
  lastStudyDate,
}: StreakWidgetProps) {
  const today = new Date();
  const lastStudy = lastStudyDate ? new Date(lastStudyDate) : today;

  // Build 7-day indicator: check which of the last 7 days fall within the streak
  const dayIndicators = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (6 - i));
    const dayLabel = day.toLocaleDateString("en-US", { weekday: "narrow" });

    // A day is "filled" if it's within streakCount days before lastStudyDate
    const diffMs = lastStudy.getTime() - day.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const filled = diffDays >= 0 && diffDays < streakCount;

    return { dayLabel, filled };
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="text-2xl" role="img" aria-label="fire">
            🔥
          </span>
          Study Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Streak count */}
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-4xl font-bold text-brand-primary">
            {streakCount}
          </span>
          <span className="text-sm text-nxted-muted">
            {streakCount === 1 ? "day" : "days"}
          </span>
        </div>

        {/* Best streak */}
        <p className="text-xs text-nxted-muted">
          Best streak:{" "}
          <span className="font-semibold text-nxted-dark">{bestStreak} days</span>
        </p>

        {/* 7-day indicator */}
        <div className="flex items-center justify-between gap-1">
          {dayIndicators.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "h-3 w-3 rounded-full transition-colors",
                  day.filled
                    ? "bg-brand-primary shadow-sm shadow-brand-primary/30"
                    : "bg-nxted-border"
                )}
              />
              <span className="text-[10px] text-nxted-muted">
                {day.dayLabel}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
