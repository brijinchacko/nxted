"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ContentCard, type ContentCardType } from "./content-card";
import { cn } from "@/lib/utils";

interface LessonCard {
  type: ContentCardType;
  content: string;
}

interface LessonPlayerProps {
  cards: LessonCard[];
  courseTitle: string;
  lessonTitle: string;
  currentIndex: number;
  totalLessons: number;
}

export function LessonPlayer({
  cards,
  courseTitle,
  lessonTitle,
  currentIndex,
  totalLessons,
}: LessonPlayerProps) {
  const [cardIndex, setCardIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const progressPercent =
    cards.length > 0 ? ((cardIndex + 1) / cards.length) * 100 : 0;

  const goToPrev = () => {
    if (cardIndex > 0) setCardIndex(cardIndex - 1);
  };

  const goToNext = () => {
    if (cardIndex < cards.length - 1) setCardIndex(cardIndex + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-nxted-muted">{courseTitle}</p>
          <h2 className="font-heading text-lg font-semibold text-white">
            {lessonTitle}
          </h2>
          <p className="text-xs text-nxted-muted">
            Lesson {currentIndex} of {totalLessons}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setAudioEnabled(!audioEnabled)}
          aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
        >
          {audioEnabled ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5 text-nxted-muted" />
          )}
        </Button>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-nxted-muted">
          <span>
            Card {cardIndex + 1} of {cards.length}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} />
      </div>

      {/* Current card */}
      {cards.length > 0 && (
        <div className="min-h-[200px]">
          <ContentCard
            type={cards[cardIndex].type}
            content={cards[cardIndex].content}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={goToPrev}
          disabled={cardIndex === 0}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        <div className="flex gap-1">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setCardIndex(i)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                i === cardIndex
                  ? "w-6 bg-brand-primary"
                  : "bg-nxted-border hover:bg-nxted-muted"
              )}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
        <Button
          variant={cardIndex === cards.length - 1 ? "default" : "secondary"}
          onClick={goToNext}
          disabled={cardIndex === cards.length - 1}
          className="gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
