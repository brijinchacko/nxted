import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { canAccessLesson } from "@/lib/plan-check";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const lesson = await db.lesson.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            creatorId: true,
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    // Plan gating check
    const userPlan = user.plan as "FREE" | "PRO" | "TEAMS";
    if (!canAccessLesson(userPlan, lesson.isFree)) {
      return NextResponse.json(
        {
          error: "Upgrade required",
          message:
            "This lesson requires a Pro or Teams plan. Upgrade to unlock all lessons.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ lesson });
  } catch (error) {
    console.error("[LESSON_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch lesson" },
      { status: 500 }
    );
  }
}
