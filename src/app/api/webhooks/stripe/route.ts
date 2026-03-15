import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  const stripe = getStripe();

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("[STRIPE_WEBHOOK_VERIFY_ERROR]", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (!customerId) break;

        // Get subscription details to determine plan
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const subscription: any =
          await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items?.data?.[0]?.price?.id;

        const plan = determinePlan(priceId);

        await db.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: {
            plan,
            stripeSubscriptionId: subscriptionId,
            planExpiresAt: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000)
              : undefined,
          },
        });

        break;
      }

      case "customer.subscription.updated": {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const subscription = event.data.object as any;
        const customerId = subscription.customer as string;
        const priceId = subscription.items?.data?.[0]?.price?.id;

        const plan = determinePlan(priceId);

        await db.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: {
            plan,
            planExpiresAt: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000)
              : undefined,
          },
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await db.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: {
            plan: "FREE",
            stripeSubscriptionId: null,
            planExpiresAt: null,
          },
        });

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        console.error(
          `[STRIPE_PAYMENT_FAILED] Customer: ${customerId}, Invoice: ${invoice.id}`
        );

        break;
      }

      default:
        // Unhandled event type
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[STRIPE_WEBHOOK_ERROR]", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

function determinePlan(priceId: string | undefined): "FREE" | "PRO" | "PRO_ANNUAL" | "TEAMS" {
  if (!priceId) return "FREE";

  if (priceId === process.env.STRIPE_PRO_MONTHLY_PRICE_ID) return "PRO";
  if (priceId === process.env.STRIPE_PRO_ANNUAL_PRICE_ID) return "PRO_ANNUAL";
  if (priceId === process.env.STRIPE_TEAMS_PRICE_ID) return "TEAMS";

  return "PRO";
}
