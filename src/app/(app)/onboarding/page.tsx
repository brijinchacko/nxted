"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Sparkles,
  Brain,
  Target,
  HelpCircle,
  Clock,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const GOALS = [
  { id: "career", label: "Career Growth", icon: Briefcase },
  { id: "personal", label: "Personal Development", icon: Sparkles },
  { id: "sharp", label: "Keep My Mind Sharp", icon: Brain },
  { id: "skill", label: "Specific Skill", icon: Target },
  { id: "curious", label: "Just Curious", icon: HelpCircle },
];

const TOPICS = [
  { id: "communication", label: "Communication", icon: "💬", color: "#00e5b4" },
  { id: "history", label: "History & Culture", icon: "🏛️", color: "#7b5cff" },
  { id: "science", label: "Science & Biology", icon: "🔬", color: "#ff8a3d" },
  { id: "math", label: "Logic & Math", icon: "🧮", color: "#ffc93c" },
  { id: "finance", label: "Personal Finance", icon: "💰", color: "#4ade80" },
  { id: "psychology", label: "Psychology", icon: "🧠", color: "#f472b6" },
  { id: "philosophy", label: "Philosophy", icon: "🤔", color: "#94a3b8" },
  { id: "art", label: "Art & Literature", icon: "🎨", color: "#fb923c" },
  { id: "productivity", label: "Productivity", icon: "⚡", color: "#22d3ee" },
  { id: "business", label: "Business", icon: "📊", color: "#818cf8" },
  { id: "engineering", label: "Engineering", icon: "⚙️", color: "#6ee7b7" },
  { id: "plc", label: "PLC & Automation", icon: "🤖", color: "#00e5b4" },
];

const TIME_OPTIONS = [
  { value: 5, label: "5 minutes" },
  { value: 10, label: "10 minutes" },
  { value: 15, label: "15 minutes" },
  { value: 20, label: "20+ minutes" },
];

const LEVELS = [
  { id: "beginner", label: "Beginner", desc: "I'm new to most of these topics" },
  { id: "some", label: "Some Knowledge", desc: "I know the basics of a few" },
  { id: "intermediate", label: "Intermediate", desc: "I'm fairly comfortable" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [studyTime, setStudyTime] = useState(15);
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleGoal = (id: string) =>
    setGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : prev.length < 3 ? [...prev, id] : prev
    );

  const toggleTopic = (id: string) =>
    setTopics((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : prev.length < 5
          ? [...prev, id]
          : prev
    );

  const canProceed = () => {
    if (step === 1) return goals.length > 0;
    if (step === 2) return topics.length >= 2;
    if (step === 3) return true;
    if (step === 4) return level !== "";
    return true;
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await fetch("/api/user/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          learningGoals: goals,
          preferredTopics: topics,
          studyTimeMinutes: studyTime,
          onboardingCompleted: true,
        }),
      });
      router.push("/dashboard");
    } catch {
      setLoading(false);
    }
  };

  const handleBuildPlan = () => {
    setStep(5);
    setTimeout(() => setStep(6), 3000);
  };

  return (
    <div className="min-h-screen bg-nxted-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-nxted-card border-nxted-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  s <= step ? "bg-brand-primary" : "bg-nxted-border"
                )}
              />
            ))}
          </div>
          <CardTitle className="text-2xl font-heading">
            {step === 1 && "What brings you to nxtED?"}
            {step === 2 && "Which topics interest you most?"}
            {step === 3 && "How much time can you dedicate daily?"}
            {step === 4 && "What's your current level?"}
            {step === 5 && "Building your learning plan..."}
            {step === 6 && "Your personalised plan is ready!"}
          </CardTitle>
          <p className="text-nxted-muted text-sm">
            {step === 1 && "Select 1-3 goals"}
            {step === 2 && "Select 2-5 topics"}
            {step === 3 && "We'll optimise your lessons for this time"}
            {step === 4 && "This helps us tailor difficulty"}
          </p>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <div className="grid gap-3">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border transition-all text-left",
                    goals.includes(goal.id)
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-nxted-border hover:border-nxted-muted"
                  )}
                >
                  <goal.icon className="h-5 w-5 text-brand-primary" />
                  <span className="font-medium">{goal.label}</span>
                  {goals.includes(goal.id) && (
                    <CheckCircle2 className="h-5 w-5 text-brand-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                    topics.includes(topic.id)
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-nxted-border hover:border-nxted-muted"
                  )}
                >
                  <span className="text-2xl">{topic.icon}</span>
                  <span className="text-sm font-medium text-center">{topic.label}</span>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-2 gap-3">
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStudyTime(opt.value)}
                  className={cn(
                    "flex items-center justify-center gap-2 p-6 rounded-xl border transition-all",
                    studyTime === opt.value
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-nxted-border hover:border-nxted-muted"
                  )}
                >
                  <Clock className="h-5 w-5 text-brand-primary" />
                  <span className="font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-3">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setLevel(lvl.id)}
                  className={cn(
                    "flex flex-col gap-1 p-4 rounded-xl border transition-all text-left",
                    level === lvl.id
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-nxted-border hover:border-nxted-muted"
                  )}
                >
                  <span className="font-medium">{lvl.label}</span>
                  <span className="text-sm text-nxted-muted">{lvl.desc}</span>
                </button>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col items-center gap-6 py-8">
              <Loader2 className="h-12 w-12 animate-spin text-brand-primary" />
              <div className="w-full max-w-sm space-y-3">
                {["Analysing your goals...", "Finding best topics...", "Creating your plan..."].map(
                  (text, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-sm text-nxted-muted">{text}</p>
                      <div className="h-2 rounded-full bg-nxted-border overflow-hidden">
                        <div
                          className="h-full bg-brand-primary rounded-full transition-all duration-1000"
                          style={{ width: "100%", animationDelay: `${i * 0.5}s` }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div className="bg-nxted-surface rounded-xl p-6 border border-nxted-border">
                <h3 className="font-heading text-lg mb-3">Your Daily Plan</h3>
                <ul className="space-y-2 text-sm text-nxted-muted">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                    {studyTime} minutes of focused learning per day
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                    {topics.length} topics tailored to your interests
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                    AI-powered tutoring and spaced repetition
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                    Daily streak tracking to keep you motivated
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handleComplete} disabled={loading} className="w-full">
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Start Learning Free"
                  )}
                </Button>
                <Button variant="secondary" className="w-full" asChild>
                  <a href="/courses">Browse Courses</a>
                </Button>
              </div>

              <p className="text-xs text-center text-nxted-muted">
                Free plan: 3 lessons/week. Upgrade to Pro for unlimited access at
                £9.99/month.
              </p>
            </div>
          )}

          {step < 5 && (
            <div className="flex justify-between mt-6">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={() => (step === 4 ? handleBuildPlan() : setStep((s) => s + 1))}
                disabled={!canProceed()}
              >
                {step === 4 ? "Build My Plan" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
