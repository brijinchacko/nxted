"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqCategories: { title: string; icon: string; items: FAQItem[] }[] = [
  {
    title: "Getting Started",
    icon: "🚀",
    items: [
      {
        question: "What is nxtED?",
        answer:
          "nxtED is an AI-powered microlearning platform that helps you learn anything in just 15 minutes per day. It combines personalized lessons, AI tutoring, spaced repetition, and gamification to make learning effective and fun.",
      },
      {
        question: "How do I create an account?",
        answer:
          'Click the "Sign Up" button on the top right corner. You can register with your email address or use social login. After signing up, you\'ll go through a quick onboarding to personalize your learning experience.',
      },
      {
        question: "Is nxtED free to use?",
        answer:
          "Yes! nxtED offers a free plan that includes access to 3 lessons per week, basic progress tracking, and community courses. For unlimited access, AI tutoring, audio lessons, and spaced repetition, you can upgrade to our Pro plan.",
      },
      {
        question: "What topics can I learn on nxtED?",
        answer:
          "nxtED covers a wide range of topics including Communication, History, Science, Math, Finance, Psychology, Philosophy, Art, Productivity, Business, Engineering, and PLC & Automation. New courses are added regularly by our community of creators.",
      },
    ],
  },
  {
    title: "Learning & Courses",
    icon: "📚",
    items: [
      {
        question: "How does the microlearning format work?",
        answer:
          "Each lesson is broken into bite-sized content cards that you can complete in about 5-15 minutes. This format leverages cognitive science principles to maximize retention and fit learning into your busy schedule.",
      },
      {
        question: "What is the AI Tutor?",
        answer:
          "The AI Tutor is your personal learning assistant powered by advanced AI. You can ask questions about lesson content, get explanations in different ways, and have interactive conversations to deepen your understanding. Available on Pro plans.",
      },
      {
        question: "What is spaced repetition?",
        answer:
          "Spaced repetition is a scientifically proven learning technique that reviews information at optimal intervals to move knowledge into long-term memory. nxtED uses the SM2 algorithm to automatically schedule flashcard reviews based on your performance.",
      },
      {
        question: "How do streaks and XP work?",
        answer:
          "You earn XP (experience points) by completing lessons and quizzes. Your streak counts consecutive days of learning. These gamification features help you stay motivated and build consistent study habits.",
      },
    ],
  },
  {
    title: "Subscriptions & Billing",
    icon: "💳",
    items: [
      {
        question: "What's included in the Pro plan?",
        answer:
          "The Pro plan (£9.99/month or £79.99/year) includes unlimited lessons, AI tutor access (100 messages/hour), audio lessons, spaced repetition, advanced analytics, and course certificates.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Yes, you can cancel your subscription at any time. Your Pro access will continue until the end of your current billing period. You can manage your subscription from the Settings page.",
      },
      {
        question: "Do you offer team plans?",
        answer:
          "Yes! Our Teams plan (£29/seat/month) is designed for organizations. It includes everything in Pro plus team analytics, admin controls, custom branding, and dedicated support.",
      },
    ],
  },
  {
    title: "Creators",
    icon: "✨",
    items: [
      {
        question: "How can I become a course creator?",
        answer:
          "Any registered user can become a creator. Go to the Creator Studio from your dashboard to start building courses. You can create lessons with rich content, generate AI-powered quizzes, and publish courses for the community.",
      },
      {
        question: "How does revenue sharing work?",
        answer:
          "Creators earn 70% of the revenue from their paid courses. Earnings are tracked in the Creator Studio and payouts are processed through Stripe.",
      },
    ],
  },
  {
    title: "Technical & Account",
    icon: "⚙️",
    items: [
      {
        question: "I forgot my password. How do I reset it?",
        answer:
          'Click "Sign In" and then "Forgot Password". Enter your email address, and we\'ll send you a link to reset your password.',
      },
      {
        question: "Which browsers are supported?",
        answer:
          "nxtED works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for the best experience.",
      },
      {
        question: "How do I report a bug or issue?",
        answer:
          'You can raise a support ticket from the "Support" section in your dashboard. Our team will investigate and respond as quickly as possible.',
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes, we take data security seriously. All data is encrypted in transit and at rest. We use industry-standard authentication through Clerk and payment processing through Stripe. We never share your personal data with third parties.",
      },
    ],
  },
];

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-nxted-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-1 text-left hover:text-brand-primary transition-colors"
      >
        <span className="font-medium text-sm pr-4">{item.question}</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-nxted-muted transition-transform", open && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all", open ? "max-h-96 pb-4" : "max-h-0")}>
        <p className="text-sm text-nxted-muted px-1 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-brand-primary/10 p-3">
            <HelpCircle className="h-8 w-8 text-brand-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-heading font-bold mb-3">Frequently Asked Questions</h1>
        <p className="text-nxted-muted max-w-xl mx-auto">
          Find answers to common questions about nxtED. Can&apos;t find what you&apos;re looking for?{" "}
          <Link href="/support/new" className="text-brand-primary hover:underline">
            Raise a support ticket
          </Link>
          .
        </p>
      </div>

      <div className="space-y-6">
        {faqCategories.map((category) => (
          <Card key={category.title} className="bg-nxted-card border-nxted-border">
            <CardContent className="pt-6">
              <h2 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
                <span>{category.icon}</span>
                {category.title}
              </h2>
              <div>
                {category.items.map((item) => (
                  <FAQAccordionItem key={item.question} item={item} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <Card className="bg-nxted-card border-nxted-border mt-10">
        <CardContent className="flex flex-col sm:flex-row items-center justify-between py-8 gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-brand-primary" />
            <div>
              <p className="font-heading font-semibold">Still have questions?</p>
              <p className="text-sm text-nxted-muted">Our support team is here to help.</p>
            </div>
          </div>
          <Link href="/support/new">
            <Button>Raise a Ticket</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
