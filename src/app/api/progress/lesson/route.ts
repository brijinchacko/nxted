import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
    const { lessonId, status, timeSpentSec, quizScore } = body;

    if (!lessonId || !status) {
      return NextResponse.json(
        { error: "lessonId and status are required" },
        { status: 400 }
      );
    }

    // Verify lesson exists and get course info
    const lesson = await db.lesson.findUnique({
      where: { id: lessonId },
      include: {
        course: {
          include: {
            lessons: { select: { id: true } },
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

    // Upsert lesson progress
    const progressData: Record<string, unknown> = {
      status,
      timeSpentSec: timeSpentSec || 0,
    };

    if (status === "COMPLETED") {
      progressData.completedAt = new Date();
    }

    if (quizScore !== undefined) {
      progressData.quizScore = quizScore;
    }

    const progress = await db.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId,
        },
      },
      create: {
        userId: user.id,
        lessonId,
        ...progressData,
      },
      update: progressData,
    });

    // Update enrollment progress
    const totalLessons = lesson.course.lessons.length;
    const completedLessons = await db.lessonProgress.count({
      where: {
        userId: user.id,
        lessonId: { in: lesson.course.lessons.map((l) => l.id) },
        status: "COMPLETED",
      },
    });

    const enrollmentProgress =
      totalLessons > 0 ? completedLessons / totalLessons : 0;

    await db.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: lesson.courseId,
        },
      },
      create: {
        userId: user.id,
        courseId: lesson.courseId,
        progress: enrollmentProgress,
        completedAt: enrollmentProgress >= 1 ? new Date() : null,
      },
      update: {
        progress: enrollmentProgress,
        completedAt: enrollmentProgress >= 1 ? new Date() : null,
      },
    });

    // If lesson completed, update streak and award XP
    if (status === "COMPLETED") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const lastStudy = user.lastStudyDate
        ? new Date(user.lastStudyDate)
        : null;
      if (lastStudy) {
        lastStudy.setHours(0, 0, 0, 0);
      }

      let newStreak = user.streakCount;
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (!lastStudy || lastStudy.getTime() < yesterday.getTime()) {
        // Streak broken or first study — start new streak
        newStreak = 1;
      } else if (lastStudy.getTime() === yesterday.getTime()) {
        // Consecutive day — increment streak
        newStreak += 1;
      }
      // Same day — streak stays the same

      // XP: 50 base + quiz bonus (up to 50 for perfect score)
      let xpGained = 50;
      if (quizScore !== undefined && quizScore !== null) {
        xpGained += Math.round((quizScore / 100) * 50);
      }

      await db.user.update({
        where: { id: user.id },
        data: {
          streakCount: newStreak,
          bestStreak: Math.max(newStreak, user.bestStreak),
          lastStudyDate: new Date(),
          totalXP: { increment: xpGained },
        },
      });
    }

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("[PROGRESS_LESSON_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update lesson progress" },
      { status: 500 }
    );
  }
}
