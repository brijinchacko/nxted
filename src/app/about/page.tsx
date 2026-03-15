import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/branding/header";
import { Footer } from "@/components/branding/footer";
import {
  Sparkles,
  GraduationCap,
  ExternalLink,
  Globe,
  Cpu,
  Layers,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about nxtED AI — AI-powered microlearning built by OFORO AI.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-nxted-dark">
      <Header />

      <main className="flex-1">
        {/* ───── Hero ───── */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand-secondary/10 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-24 text-center sm:px-6 sm:pt-32 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-nxted-border bg-nxted-surface/60 px-4 py-2 text-xs text-nxted-muted">
              <GraduationCap className="h-3.5 w-3.5 text-brand-primary" />
              About Us
            </div>

            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              About{" "}
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                nxtED AI
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-nxted-muted">
              nxtED AI is a microlearning platform that uses artificial
              intelligence to make high-quality education accessible, engaging,
              and effective. We believe anyone should be able to learn anything
              — in just 15 minutes a day.
            </p>
          </div>
        </section>

        {/* ───── Mission ───── */}
        <section className="border-t border-nxted-border bg-nxted-surface/40 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Our Mission
            </h2>
            <p className="mt-4 leading-relaxed text-nxted-muted">
              Traditional education demands hours of time, rigid schedules, and
              one-size-fits-all content. nxtED AI is different. We use AI to
              generate personalised curricula, adapt to every learner&apos;s
              pace, and reinforce knowledge with scientifically proven spaced
              repetition. Whether you want to understand psychology, master
              personal finance, or explore industrial automation — we meet you
              where you are and help you grow, every single day.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <Card className="border-nxted-border bg-nxted-card">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
                    <Sparkles className="h-5 w-5 text-brand-primary" />
                  </div>
                  <CardTitle className="text-base">Personalised</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-nxted-muted">
                    AI builds a unique learning path based on your goals, pace,
                    and interests.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-nxted-border bg-nxted-card">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary/10">
                    <Cpu className="h-5 w-5 text-brand-secondary" />
                  </div>
                  <CardTitle className="text-base">Intelligent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-nxted-muted">
                    An AI tutor that understands your lessons and answers
                    questions in context.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-nxted-border bg-nxted-card">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-nxted-orange/10">
                    <Layers className="h-5 w-5 text-nxted-orange" />
                  </div>
                  <CardTitle className="text-base">Effective</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-nxted-muted">
                    Spaced repetition and bite-sized sessions ensure knowledge
                    sticks for life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ───── Built by OFORO AI ───── */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Built by{" "}
              <span className="text-brand-secondary">OFORO AI</span>
            </h2>
            <p className="mt-4 leading-relaxed text-nxted-muted">
              OFORO AI is an applied artificial intelligence company founded by{" "}
              <strong className="text-white">
                Joseph Brijin Chacko (CEng)
              </strong>
              , based in Milton Keynes, United Kingdom. We design and build
              intelligent software products that solve real-world problems
              across education, engineering, and enterprise.
            </p>
            <p className="mt-4 text-lg font-medium text-brand-secondary">
              Intelligence That Works.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="https://oforo.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-nxted-border bg-nxted-card px-5 py-3 text-sm font-medium text-white transition-colors hover:border-brand-secondary hover:text-brand-secondary"
              >
                <Globe className="h-4 w-4" />
                oforo.ai
                <ExternalLink className="h-3 w-3 text-nxted-muted" />
              </Link>
              <Link
                href="https://jbc404.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-nxted-border bg-nxted-card px-5 py-3 text-sm font-medium text-white transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                <Globe className="h-4 w-4" />
                jbc404.com
                <ExternalLink className="h-3 w-3 text-nxted-muted" />
              </Link>
            </div>
          </div>
        </section>

        {/* ───── Wartens Ecosystem ───── */}
        <section className="border-t border-nxted-border bg-nxted-surface/40 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Part of the Wartens Ecosystem
            </h2>
            <p className="mt-4 leading-relaxed text-nxted-muted">
              nxtED AI is part of the Wartens Ecosystem — a suite of
              interconnected AI-powered products built by OFORO AI. The Wartens
              platform brings together tools for learning, productivity, and
              intelligent automation under a single cohesive vision.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
