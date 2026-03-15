"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, RotateCcw, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpacedRepCard {
  id: string;
  front: string;
  back: string;
}

const GRADES = [
  { value: 1, label: "Again", color: "bg-red-100 text-red-700 hover:bg-red-200" },
  { value: 2, label: "Hard", color: "bg-orange-100 text-orange-700 hover:bg-orange-200" },
  { value: 3, label: "Good", color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
  { value: 4, label: "Easy", color: "bg-green-100 text-green-700 hover:bg-green-200" },
  { value: 5, label: "Perfect", color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" },
];

export default function ReviewPage() {
  const [cards, setCards] = useState<SpacedRepCard[]>([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch("/api/spaced-rep/due")
      .then((r) => r.json())
      .then((data) => {
        setCards(data.cards ?? []);
        setLoading(false);
        if (!data.cards?.length) setDone(true);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleGrade = async (grade: number) => {
    const card = cards[current];
    await fetch("/api/spaced-rep/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId: card.id, grade }),
    });

    setFlipped(false);
    if (current < cards.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setDone(true);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <Brain className="h-12 w-12 animate-pulse text-brand-primary mx-auto mb-4" />
        <p className="text-nxted-muted">Loading review cards...</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <CheckCircle2 className="h-16 w-16 text-nxted-green mx-auto mb-4" />
        <h1 className="text-3xl font-heading font-bold mb-2">All Done!</h1>
        <p className="text-nxted-muted mb-6">
          {cards.length > 0
            ? `You reviewed ${cards.length} cards. Great job!`
            : "No cards due for review right now. Check back later!"}
        </p>
        <Button asChild>
          <a href="/dashboard">Back to Dashboard</a>
        </Button>
      </div>
    );
  }

  const card = cards[current];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Brain className="h-6 w-6 text-brand-primary" />
          <h1 className="text-2xl font-heading font-bold">Spaced Repetition</h1>
        </div>
        <span className="text-sm text-nxted-muted">
          {current + 1} / {cards.length}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full h-1.5 rounded-full bg-nxted-card-alt mb-8 overflow-hidden">
        <div
          className="h-full bg-brand-primary rounded-full transition-all"
          style={{ width: `${((current + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <button
        onClick={() => setFlipped(!flipped)}
        className="w-full"
      >
        <Card className="bg-nxted-card border-nxted-border min-h-[250px] flex items-center justify-center cursor-pointer hover:border-brand-primary transition-colors">
          <CardContent className="pt-6 text-center">
            <p className="text-xs text-nxted-muted mb-4">
              {flipped ? "Answer" : "Question"} — tap to flip
            </p>
            <p className="text-xl leading-relaxed">
              {flipped ? card.back : card.front}
            </p>
          </CardContent>
        </Card>
      </button>

      {/* Grade buttons */}
      {flipped && (
        <div className="flex gap-2 mt-6 justify-center">
          {GRADES.map((g) => (
            <button
              key={g.value}
              onClick={() => handleGrade(g.value)}
              className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", g.color)}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
