import { safeAuth } from "@/lib/clerk";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await safeAuth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: {
        id: true,
        streakCount: true,
        bestStreak: true,
        totalXP: true,
        lastStudyDate: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const [enrollments, lessonProgress, quizStats] = await Promise.all([
      db.enrollment.findMany({
        where: { userId: user.id },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
              coverImage: true,
              _count: { select: { lessons: true } },
            },
          },
        },
        orderBy: { startedAt: "desc" },
      }),
      db.lessonProgress.findMany({
        where: { userId: user.id },
        include: {
          lesson: {
            select: {
              id: true,
              title: true,
              courseId: true,
            },
          },
        },
        orderBy: { updatedAt: "desc" },
      }),
      db.quizAttempt.aggregate({
        where: { userId: user.id },
        _avg: { score: true },
        _count: { id: true },
        _max: { score: true },
      }),
    ]);

    return NextResponse.json({
      streak: {
        current: user.streakCount,
        best: user.bestStreak,
        lastStudyDate: user.lastStudyDate,
      },
      xp: user.totalXP,
      enrollments,
      lessonProgress,
      quizStats: {
        totalAttempts: quizStats._count.id,
        averageScore: quizStats._avg.score,
        bestScore: quizStats._max.score,
      },
    });
  } catch (error) {
    console.error("[PROGRESS_USER_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch user progress" },
      { status: 500 }
    );
  }
}
