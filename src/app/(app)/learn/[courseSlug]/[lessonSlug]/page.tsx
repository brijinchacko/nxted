import { db } from "@/lib/db";
import { safeAuth } from "@/lib/clerk";
import { notFound, redirect } from "next/navigation";
import { LessonPlayerClient } from "./lesson-player-client";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  try {
    const { courseSlug } = await params;
    const course = await db.course.findUnique({ where: { slug: courseSlug } });
    return { title: course?.title ?? "Lesson" };
  } catch {
    return { title: "Lesson" };
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;

  const { userId } = await safeAuth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect("/sign-up");

  const course = await db.course.findUnique({
    where: { slug: courseSlug },
    include: {
      lessons: { where: { isPublished: true }, orderBy: { order: "asc" } },
    },
  });
  if (!course) notFound();

  const lesson = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) notFound();

  // Plan gating
  if (!lesson.isFree && user.plan === "FREE") {
    redirect(`/courses/${courseSlug}?upgrade=true`);
  }

  const lessonIndex = course.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;

  return (
    <LessonPlayerClient
      lesson={{
        id: lesson.id,
        title: lesson.title,
        content: lesson.content as { cards: { type: string; content: string }[] },
        audioUrl: lesson.audioUrl,
        estimatedMinutes: lesson.estimatedMinutes,
      }}
      courseTitle={course.title}
      courseSlug={courseSlug}
      currentIndex={lessonIndex + 1}
      totalLessons={course.lessons.length}
      prevSlug={prevLesson?.slug ?? null}
      nextSlug={nextLesson?.slug ?? null}
      userId={user.id}
    />
  );
}
