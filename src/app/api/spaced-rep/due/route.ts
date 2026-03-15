import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
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

    const dueCards = await db.spacedRepCard.findMany({
      where: {
        userId: user.id,
        nextReviewAt: { lte: new Date() },
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            courseId: true,
          },
        },
      },
      orderBy: { nextReviewAt: "asc" },
    });

    return NextResponse.json({ cards: dueCards });
  } catch (error) {
    console.error("[SPACED_REP_DUE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch due cards" },
      { status: 500 }
    );
  }
}
