import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface XPDisplayProps {
  totalXP: number;
}

export function XPDisplay({ totalXP }: XPDisplayProps) {
  const level = Math.floor(totalXP / 500) + 1;
  const xpInCurrentLevel = totalXP % 500;
  const xpToNextLevel = 500;
  const progressPercent = (xpInCurrentLevel / xpToNextLevel) * 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span>Level {level}</span>
          <span className="text-sm font-normal text-nxted-muted">
            {totalXP.toLocaleString()} XP
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={progressPercent} />
        <div className="flex items-center justify-between text-xs text-nxted-muted">
          <span>{xpInCurrentLevel} / {xpToNextLevel} XP</span>
          <span>{xpToNextLevel - xpInCurrentLevel} XP to Level {level + 1}</span>
        </div>
      </CardContent>
    </Card>
  );
}
