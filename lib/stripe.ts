import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
  appInfo: { name: 'nxted.ai', version: '1.0.0' },
});

export const PRICE_IDS = {
  expertQuick: process.env.STRIPE_EXPERT_QUICK_PRICE || '',
  expertStarter: process.env.STRIPE_EXPERT_STARTER_PRICE || '',
  expertGrowth: process.env.STRIPE_EXPERT_GROWTH_PRICE || '',
  expertScale: process.env.STRIPE_EXPERT_SCALE_PRICE || '',
} as const;
