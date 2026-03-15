import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
});

export const PLANS = {
  PRO_MONTHLY: {
    name: "Pro Monthly",
    price: 999, // £9.99 in pence
    currency: "gbp",
    interval: "month" as const,
    priceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    features: [
      "Unlimited lessons",
      "AI Tutor access",
      "Audio downloads",
      "Spaced repetition",
      "Progress analytics",
    ],
  },
  PRO_ANNUAL: {
    name: "Pro Annual",
    price: 7999, // £79.99 in pence
    currency: "gbp",
    interval: "year" as const,
    priceId: process.env.STRIPE_PRO_ANNUAL_PRICE_ID!,
    features: [
      "Everything in Pro Monthly",
      "2 months free",
      "Priority support",
    ],
  },
  TEAMS: {
    name: "Teams",
    price: 2900, // £29.00 per seat in pence
    currency: "gbp",
    interval: "month" as const,
    perSeat: true,
    priceId: process.env.STRIPE_TEAMS_PRICE_ID!,
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Shared progress tracking",
      "Custom learning paths",
      "Admin controls",
    ],
  },
  CERTIFICATE: {
    name: "Certificate",
    price: 2900, // £29.00 one-time in pence
    currency: "gbp",
    interval: null,
    oneTime: true,
    priceId: process.env.STRIPE_CERTIFICATE_PRICE_ID!,
    features: [
      "Verified digital certificate",
      "Shareable link",
      "PDF download",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
