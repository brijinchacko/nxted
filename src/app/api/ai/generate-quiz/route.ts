import { safeAuth } from "@/lib/clerk";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateQuiz } from "@/lib/openrouter";

export async function POST(req: Request) {
  try {
    const { userId } = await safeAuth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Creator role check
    if (user.role !== "CREATOR" && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only creators can generate quizzes" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { lessonContent, keyPoints } = body;

    if (!lessonContent || typeof lessonContent !== "string") {
      return NextResponse.json(
        { error: "lessonContent is required" },
        { status: 400 }
      );
    }

    if (!keyPoints || !Array.isArray(keyPoints) || keyPoints.length === 0) {
      return NextResponse.json(
        { error: "keyPoints array is required" },
        { status: 400 }
      );
    }

    const questions = await generateQuiz(lessonContent, keyPoints);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("[GENERATE_QUIZ_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
