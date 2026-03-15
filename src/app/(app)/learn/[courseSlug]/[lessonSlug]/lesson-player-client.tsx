"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatPanel } from "@/components/ai-tutor/chat-panel";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  MessageCircle,
  CheckCircle2,
  Lightbulb,
  HelpCircle,
  BookOpen,
  X,
} from "lucide-react";

interface LessonCard {
  type: string;
  content: string;
}

interface Props {
  lesson: {
    id: string;
    title: string;
    content: { cards: LessonCard[] };
    audioUrl: string | null;
    estimatedMinutes: number;
  };
  courseTitle: string;
  courseSlug: string;
  currentIndex: number;
  totalLessons: number;
  prevSlug: string | null;
  nextSlug: string | null;
  userId: string;
}

const cardIcons: Record<string, typeof Lightbulb> = {
  concept: BookOpen,
  fact: Lightbulb,
  practice: HelpCircle,
  recap: CheckCircle2,
};

const cardLabels: Record<string, string> = {
  concept: "Concept",
  fact: "Did You Know?",
  practice: "Practice",
  recap: "Recap",
};

const cardAccents: Record<string, string> = {
  concept: "border-l-brand-primary",
  fact: "border-l-blue-400",
  practice: "border-l-nxted-orange",
  recap: "border-l-nxted-green",
};

export function LessonPlayerClient({
  lesson,
  courseTitle,
  courseSlug,
  currentIndex,
  totalLessons,
  prevSlug,
  nextSlug,
  userId,
}: Props) {
  const [currentCard, setCurrentCard] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [completed, setCompleted] = useState(false);
  const cards = lesson.content.cards;
  const card = cards[currentCard];
  const Icon = cardIcons[card.type] ?? BookOpen;

  const handleComplete = async () => {
    await fetch("/api/progress/lesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: lesson.id, status: "COMPLETED", timeSpentSec: lesson.estimatedMinutes * 60 }),
    });
    setCompleted(true);
  };

  const isLast = currentCard === cards.length - 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href={`/courses/${courseSlug}`} className="text-sm text-nxted-muted hover:text-brand-primary">
            {courseTitle}
          </Link>
          <h1 className="text-2xl font-heading font-bold">{lesson.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-nxted-muted">
            Lesson {currentIndex} of {totalLessons}
          </span>
          <Button variant="outline" size="sm" onClick={() => setShowChat(!showChat)}>
            <MessageCircle className="h-4 w-4 mr-1" />
            AI Tutor
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full bg-nxted-card-alt mb-8 overflow-hidden">
        <div
          className="h-full bg-brand-primary rounded-full transition-all"
          style={{ width: `${((currentCard + 1) / cards.length) * 100}%` }}
        />
      </div>

      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1">
          <Card className={cn("bg-nxted-card border-nxted-border border-l-4 min-h-[300px]", cardAccents[card.type])}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon className="h-5 w-5 text-brand-primary" />
                <span className="text-sm font-medium text-nxted-muted">{cardLabels[card.type]}</span>
                <span className="ml-auto text-xs text-nxted-muted">
                  {currentCard + 1} / {cards.length}
                </span>
              </div>
              <p className="text-lg leading-relaxed whitespace-pre-line">{card.content}</p>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentCard((c) => c - 1)}
              disabled={currentCard === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            {isLast && !completed ? (
              <Button onClick={handleComplete}>
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Complete Lesson
              </Button>
            ) : isLast && completed ? (
              nextSlug ? (
                <Button asChild>
                  <Link href={`/learn/${courseSlug}/${nextSlug}`}>
                    Next Lesson
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link href={`/courses/${courseSlug}`}>Back to Course</Link>
                </Button>
              )
            ) : (
              <Button onClick={() => setCurrentCard((c) => c + 1)}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>

          {/* Lesson nav */}
          <div className="flex justify-between mt-4 text-sm">
            {prevSlug && (
              <Link href={`/learn/${courseSlug}/${prevSlug}`} className="text-nxted-muted hover:text-brand-primary">
                Previous Lesson
              </Link>
            )}
            <div />
            {nextSlug && (
              <Link href={`/learn/${courseSlug}/${nextSlug}`} className="text-nxted-muted hover:text-brand-primary">
                Next Lesson
              </Link>
            )}
          </div>

          {/* Completion modal */}
          {completed && (
            <Card className="bg-nxted-card border-brand-primary mt-6">
              <CardContent className="pt-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-nxted-green mx-auto mb-3" />
                <h3 className="text-xl font-heading font-bold mb-2">Lesson Complete!</h3>
                <p className="text-nxted-muted mb-1">+50 XP earned</p>
                <p className="text-sm text-nxted-muted">Keep your streak going tomorrow!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Tutor sidebar */}
        {showChat && (
          <div className="w-96 shrink-0 hidden lg:block">
            <div className="sticky top-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-semibold">AI Tutor</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowChat(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <ChatPanel lessonContext={card.content} lessonId={lesson.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
