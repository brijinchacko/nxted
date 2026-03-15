import Link from "next/link";
import { Header } from "@/components/branding/header";
import { Footer } from "@/components/branding/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  MessageCircle,
  Landmark,
  Microscope,
  Calculator,
  Banknote,
  Brain,
  Lightbulb,
  Palette,
  Zap,
  BarChart3,
  Cog,
  Bot,
  Headphones,
  RotateCcw,
  Check,
  Sparkles,
  ClipboardList,
  BookOpen,
} from "lucide-react";

const topics = [
  { name: "Communication", icon: MessageCircle, color: "#00e5b4" },
  { name: "History & Culture", icon: Landmark, color: "#7b5cff" },
  { name: "Science & Biology", icon: Microscope, color: "#3b82f6" },
  { name: "Logic & Math", icon: Calculator, color: "#f59e0b" },
  { name: "Personal Finance", icon: Banknote, color: "#10b981" },
  { name: "Psychology", icon: Brain, color: "#ec4899" },
  { name: "Philosophy", icon: Lightbulb, color: "#8b5cf6" },
  { name: "Art & Literature", icon: Palette, color: "#f97316" },
  { name: "Productivity", icon: Zap, color: "#eab308" },
  { name: "Business", icon: BarChart3, color: "#06b6d4" },
  { name: "Industrial & Engineering", icon: Cog, color: "#6b7280" },
  { name: "PLC & Automation", icon: Bot, color: "#ef4444" },
];

const steps = [
  {
    num: 1,
    title: "Take the Quiz",
    desc: "Tell us your goals, interests, and level. We build your personalised learning plan.",
    icon: ClipboardList,
  },
  {
    num: 2,
    title: "Get Your Plan",
    desc: "AI creates a custom curriculum with daily microlessons tailored to you.",
    icon: Sparkles,
  },
  {
    num: 3,
    title: "Learn Daily",
    desc: "Just 15 minutes a day. AI tutoring, quizzes, and spaced repetition lock knowledge in.",
    icon: BookOpen,
  },
];

const features = [
  {
    title: "AI Tutor",
    desc: "Chat with an AI that knows your lesson — ask questions, get explanations, and deepen your understanding in real time.",
    icon: Bot,
  },
  {
    title: "Audio Lessons",
    desc: "Listen on the go with AI-generated narration. Learn while commuting, exercising, or relaxing.",
    icon: Headphones,
  },
  {
    title: "Spaced Repetition",
    desc: "Never forget what you learn. Science-backed recall scheduling ensures knowledge sticks for good.",
    icon: RotateCcw,
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    period: "/month",
    features: [
      "3 lessons/week",
      "Basic progress tracking",
      "Community topics",
    ],
    cta: "Start Free",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "9.99",
    period: "/month",
    features: [
      "Unlimited lessons",
      "AI Tutor",
      "Audio narration",
      "Spaced repetition",
      "Certificates",
      "Priority support",
    ],
    cta: "Go Pro",
    href: "/sign-up",
    highlighted: true,
  },
  {
    name: "Teams",
    price: "29",
    period: "/seat/month",
    features: [
      "Everything in Pro",
      "Team analytics",
      "Custom learning paths",
      "Organisation branding",
      "Admin dashboard",
    ],
    cta: "Contact Us",
    href: "mailto:hello@oforo.ai",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-nxted-bg">
      <Header />

      <main className="flex-1">
        {/* ───── Hero ───── */}
        <section className="relative overflow-hidden">
          {/* Gradient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand-primary/10 blur-[120px]" />
            <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-brand-secondary/10 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-24 text-center sm:px-6 sm:pt-32 lg:px-8 lg:pt-40">
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Learn anything in{" "}
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                15 minutes
              </span>{" "}
              a day
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-nxted-muted sm:text-xl">
              AI-powered microlearning that actually teaches you. Personalized
              lessons, smart tutoring, and spaced repetition — all in bite-sized
              daily sessions.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/sign-up">Start Free</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-nxted-border bg-nxted-surface/60 px-4 py-2 text-xs text-nxted-muted backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-brand-primary" />
              Powered by OFORO AI
            </div>
          </div>
        </section>

        {/* ───── How It Works ───── */}
        <section className="border-t border-nxted-border bg-nxted-surface/40 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-nxted-muted">
              Three simple steps to unlock your learning potential.
            </p>

            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.num} className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary ring-2 ring-brand-primary/30">
                    <span className="font-heading text-xl font-bold">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-nxted-muted">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── Topics ───── */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
              What Will You Learn?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-nxted-muted">
              Explore a growing library of topics — from science to business and
              beyond.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {topics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={topic.name}
                    className="group flex items-center gap-4 rounded-xl border border-nxted-border bg-nxted-card px-5 py-4 transition-colors hover:border-nxted-muted"
                    style={{ borderLeftWidth: "3px", borderLeftColor: topic.color }}
                  >
                    <Icon
                      className="h-5 w-5 shrink-0"
                      style={{ color: topic.color }}
                    />
                    <span className="text-sm font-medium">{topic.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───── AI Features ───── */}
        <section className="border-t border-nxted-border bg-nxted-surface/40 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
              Powered by AI
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-nxted-muted">
              Intelligent features that adapt to how you learn.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <Card key={feat.title} className="border-nxted-border bg-nxted-card">
                    <CardHeader>
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
                        <Icon className="h-5 w-5 text-brand-primary" />
                      </div>
                      <CardTitle>{feat.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-nxted-muted">
                        {feat.desc}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───── Pricing ───── */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
              Simple Pricing
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-nxted-muted">
              Start free, upgrade when you are ready.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={
                    plan.highlighted
                      ? "relative border-2 border-brand-primary bg-nxted-card shadow-lg shadow-brand-primary/10"
                      : "border-nxted-border bg-nxted-card"
                  }
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-primary px-3 py-0.5 text-xs font-bold text-white">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-nxted-muted">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-heading text-4xl font-bold">
                        &pound;{plan.price}
                      </span>
                      <span className="text-sm text-nxted-muted">
                        {plan.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-nxted-muted"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      variant={plan.highlighted ? "default" : "secondary"}
                      className="w-full"
                    >
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
