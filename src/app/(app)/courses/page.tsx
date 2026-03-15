import { db } from "@/lib/db";
import { CoursesClient } from "./courses-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Courses" };

export default async function CoursesPage() {
  const courses = await db.course.findMany({
    where: { isPublished: true },
    include: { topic: true, creator: true, _count: { select: { lessons: true } } },
    orderBy: { enrollmentCount: "desc" },
  });

  const topics = await db.topic.findMany({ orderBy: { name: "asc" } });

  return (
    <CoursesClient
      courses={courses.map((c) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        description: c.description,
        difficulty: c.difficulty,
        durationMin: c.durationMin,
        isFree: c.isFree,
        price: c.price,
        avgRating: c.avgRating,
        enrollmentCount: c.enrollmentCount,
        lessonCount: c._count.lessons,
        topic: { name: c.topic.name, slug: c.topic.slug, icon: c.topic.icon, color: c.topic.color },
        creator: { name: c.creator.name },
      }))}
      topics={topics.map((t) => ({ slug: t.slug, name: t.name, icon: t.icon }))}
    />
  );
}
