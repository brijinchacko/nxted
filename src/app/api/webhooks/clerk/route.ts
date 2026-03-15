import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface ClerkWebhookPayload {
  type: string;
  data: {
    id: string;
    email_addresses?: { email_address: string }[];
    first_name?: string;
    last_name?: string;
    image_url?: string;
  };
}

export async function POST(req: Request) {
  try {
    // Verify webhook headers exist (Svix verification)
    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { error: "Missing Svix verification headers" },
        { status: 400 }
      );
    }

    const body: ClerkWebhookPayload = await req.json();
    const { type, data } = body;

    switch (type) {
      case "user.created": {
        const email =
          data.email_addresses?.[0]?.email_address;

        if (!email) {
          console.error("[CLERK_WEBHOOK] No email in user.created event");
          return NextResponse.json(
            { error: "No email provided" },
            { status: 400 }
          );
        }

        const name = [data.first_name, data.last_name]
          .filter(Boolean)
          .join(" ") || null;

        await db.user.create({
          data: {
            clerkId: data.id,
            email,
            name,
            avatarUrl: data.image_url || null,
          },
        });

        break;
      }

      default:
        // Unhandled event type
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[CLERK_WEBHOOK_ERROR]", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
