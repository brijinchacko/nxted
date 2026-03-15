import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateSpacedRepCards } from "@/lib/openrouter";

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
    const { lessonContent } = body;

    if (!lessonContent || typeof lessonContent !== "string") {
      return NextResponse.json(
        { error: "lessonContent is required" },
        { status: 400 }
      );
    }

    const cards = await generateSpacedRepCards(lessonContent);

    return NextResponse.json({ cards });
  } catch (error) {
    console.error("[GENERATE_CARDS_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to generate spaced repetition cards" },
      { status: 500 }
    );
  }
}
