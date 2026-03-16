"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqCategories: { title: string; items: FAQItem[] }[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "What is nxtED?",
        answer:
          "nxtED is a microlearning platform where you can pick up new skills in about 15 minutes a day. We mix short lessons with quizzes, spaced repetition, and a bit of friendly competition to keep things interesting.",
      },
      {
        question: "How do I create an account?",
        answer:
          "Hit the Sign Up button in the top right — you can use your email or sign in with Google. We'll ask a couple of quick questions to tailor your experience, and then you're good to go.",
      },
      {
        question: "Is nxtED free to use?",
        answer:
          "Yep! The free plan gives you 3 lessons a week, progress tracking, and access to community courses. If you want unlimited lessons, the AI tutor, audio content, and spaced repetition, you can upgrade to Pro whenever you're ready.",
      },
      {
        question: "What topics can I learn?",
        answer:
          "We cover everything from Communication and History to Finance, Engineering, and PLC & Automation — plus a bunch more. Our community of creators is always adding new courses, so there's usually something new to explore.",
      },
    ],
  },
  {
    title: "Learning & Courses",
    items: [
      {
        question: "How does the microlearning format work?",
        answer:
          "Each lesson is split into short content cards you can get through in 5 to 15 minutes. The idea is simple: smaller chunks are easier to remember, and they fit into a busy day much better than hour-long lectures.",
      },
      {
        question: "What's the AI Tutor?",
        answer:
          "Think of it as a study buddy that's always available. You can ask it to explain things differently, dive deeper into a topic, or quiz you on what you've learned. It's included with Pro plans.",
      },
      {
        question: "What is spaced repetition?",
        answer:
          "It's a study method where you review material at gradually increasing intervals — right before you'd normally forget it. nxtED handles the scheduling automatically based on how well you're doing, so the stuff you learn actually sticks.",
      },
      {
        question: "How do streaks and XP work?",
        answer:
          "You earn XP by finishing lessons and quizzes. Your streak tracks how many days in a row you've studied. It's a small thing, but it really does help you build a consistent habit.",
      },
    ],
  },
  {
    title: "Subscriptions & Billing",
    items: [
      {
        question: "What do I get with Pro?",
        answer:
          "Pro costs £9.99/month (or £79.99/year if you go annual). You get unlimited lessons, AI tutor access, audio lessons, spaced repetition, detailed analytics, and certificates when you finish courses.",
      },
      {
        question: "Can I cancel anytime?",
        answer:
          "Absolutely. No contracts, no hassle. Cancel whenever you want from your Settings page, and you'll keep Pro access until your current billing period ends.",
      },
      {
        question: "Do you have team plans?",
        answer:
          "We do — the Teams plan runs £29 per seat per month. It comes with everything in Pro, plus team analytics, admin controls, custom branding, and priority support.",
      },
    ],
  },
  {
    title: "For Creators",
    items: [
      {
        question: "Can I create my own courses?",
        answer:
          "Anyone with an account can become a creator. Head to Creator Studio from your dashboard, and you can start building lessons with rich content and auto-generated quizzes. Publish when you're ready and share with the community.",
      },
      {
        question: "How does revenue sharing work?",
        answer:
          "Creators keep 70% of the revenue from paid courses. You can track your earnings in Creator Studio, and payouts are handled through Stripe.",
      },
    ],
  },
  {
    title: "Account & Technical",
    items: [
      {
        question: "I forgot my password — what now?",
        answer:
          "No worries. Go to the Sign In page, click Forgot Password, pop in your email, and we'll send you a reset link.",
      },
      {
        question: "Which browsers work best?",
        answer:
          "Chrome, Firefox, Safari, and Edge all work well. Just make sure you're on a reasonably recent version and you should be fine.",
      },
      {
        question: "How do I report a problem?",
        answer:
          "Head over to the Support section and open a ticket. Our team will take a look and get back to you as soon as we can.",
      },
      {
        question: "Is my data safe?",
        answer:
          "Security is a priority for us. All data is encrypted, we use Clerk for authentication and Stripe for payments, and we never share your personal information with third parties.",
      },
    ],
  },
];

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-nxted-border/60 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-1 text-left group"
      >
        <span className="font-medium text-[15px] text-[#2d2d2d] group-hover:text-brand-primary transition-colors pr-4">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[#8a8580] transition-transform duration-200",
            open && "rotate-180 text-brand-primary"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <p className="text-[14px] text-[#4a4540] px-1 leading-[1.7]">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-bold text-[#2d2d2d] mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-[#6b6560] text-[15px]">
          Got a question? We've probably answered it below. If not,{" "}
          <Link
            href="/support/new"
            className="text-brand-primary hover:underline"
          >
            drop us a message
          </Link>{" "}
          and we'll help you out.
        </p>
      </div>

      <div className="space-y-8">
        {faqCategories.map((category) => (
          <div key={category.title}>
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wide text-[#8a8580] mb-3 px-1">
              {category.title}
            </h2>
            <Card className="bg-nxted-card border-nxted-border/70 shadow-sm">
              <CardContent className="py-2 px-5">
                {category.items.map((item) => (
                  <FAQAccordionItem key={item.question} item={item} />
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl bg-nxted-surface px-6 py-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-brand-primary" />
          <div>
            <p className="font-heading font-semibold text-[#2d2d2d] text-[15px]">
              Still have questions?
            </p>
            <p className="text-sm text-[#6b6560]">
              We're happy to help — just open a ticket.
            </p>
          </div>
        </div>
        <Link href="/support/new">
          <Button>Raise a Ticket</Button>
        </Link>
      </div>
    </div>
  );
}
