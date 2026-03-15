import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sm2, getNextReviewDate } from "@/lib/spaced-rep";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { cardId, grade } = body;

    if (!cardId || typeof cardId !== "string") {
      return NextResponse.json(
        { error: "cardId is required" },
        { status: 400 }
      );
    }

    if (grade === undefined || typeof grade !== "number" || grade < 0 || grade > 5) {
      return NextResponse.json(
        { error: "grade must be a number between 0 and 5" },
        { status: 400 }
      );
    }

    // Verify card belongs to user
    const card = await db.spacedRepCard.findUnique({
      where: { id: cardId },
    });

    if (!card) {
      return NextResponse.json(
        { error: "Card not found" },
        { status: 404 }
      );
    }

    if (card.userId !== user.id) {
      return NextResponse.json(
        { error: "You can only review your own cards" },
        { status: 403 }
      );
    }

    // Apply SM-2 algorithm
    const result = sm2(
      {
        easeFactor: card.easeFactor,
        interval: card.interval,
        repetitions: card.repetitions,
      },
      grade
    );

    const nextReviewAt = getNextReviewDate(result);

    const updatedCard = await db.spacedRepCard.update({
      where: { id: cardId },
      data: {
        easeFactor: result.easeFactor,
        interval: result.interval,
        repetitions: result.repetitions,
        nextReviewAt,
      },
    });

    return NextResponse.json({ card: updatedCard });
  } catch (error) {
    console.error("[SPACED_REP_REVIEW_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to review card" },
      { status: 500 }
    );
  }
}
