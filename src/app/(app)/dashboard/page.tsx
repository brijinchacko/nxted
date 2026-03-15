import { safeAuth } from "@/lib/clerk";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DashboardClient } from "./dashboard-client";

export const dynamic = "force-dynamic";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const { userId } = await safeAuth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      enrollments: {
        include: { course: { include: { topic: true } } },
        orderBy: { startedAt: "desc" },
        take: 5,
      },
      spacedRepCards: {
        where: { nextReviewAt: { lte: new Date() } },
      },
    },
  });

  if (!user) redirect("/sign-up");
  if (!user.onboardingCompleted) redirect("/onboarding");

  const recentCourses = await db.course.findMany({
    where: { isPublished: true },
    include: { topic: true, creator: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <DashboardClient
      user={{
        name: user.name,
        streakCount: user.streakCount,
        bestStreak: user.bestStreak,
        totalXP: user.totalXP,
        lastStudyDate: user.lastStudyDate?.toISOString() ?? null,
        plan: user.plan,
        studyTimeMinutes: user.studyTimeMinutes,
      }}
      enrollments={user.enrollments.map((e) => ({
        id: e.id,
        progress: e.progress,
        course: {
          title: e.course.title,
          slug: e.course.slug,
          topic: { name: e.course.topic.name, icon: e.course.topic.icon },
        },
      }))}
      spacedRepDueCount={user.spacedRepCards.length}
      recommendedCourses={recentCourses.map((c) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        description: c.description,
        difficulty: c.difficulty,
        durationMin: c.durationMin,
        isFree: c.isFree,
        topic: { name: c.topic.name, icon: c.topic.icon, color: c.topic.color },
        creator: { name: c.creator.name },
      }))}
    />
  );
}
