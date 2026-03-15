import { db } from "@/lib/db";
import { safeAuth } from "@/lib/clerk";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Clock,
  Star,
  Lock,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  User,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const course = await db.course.findUnique({ where: { slug } });
    return { title: course?.title ?? "Course" };
  } catch {
    return { title: "Course" };
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let course;
  const { slug } = await params;
  try {
    course = await db.course.findUnique({
      where: { slug },
      include: {
        topic: true,
        creator: true,
        lessons: { where: { isPublished: true }, orderBy: { order: "asc" } },
      },
    });
  } catch {
    notFound();
  }

  if (!course) notFound();

  const { userId } = await safeAuth();
  let userPlan = "FREE";
  let enrollment = null;
  let completedLessons: string[] = [];

  if (userId) {
    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (user) {
      userPlan = user.plan;
      enrollment = await db.enrollment.findUnique({
        where: { userId_courseId: { userId: user.id, courseId: course.id } },
      });
      const progress = await db.lessonProgress.findMany({
        where: { userId: user.id, lessonId: { in: course.lessons.map((l) => l.id) }, status: "COMPLETED" },
        select: { lessonId: true },
      });
      completedLessons = progress.map((p) => p.lessonId);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: course.topic.color ?? "#e8491d" }}
          />
          <span className="text-sm text-nxted-muted">{course.topic.name}</span>
          <span className="text-sm text-nxted-muted">
            {course.difficulty.charAt(0) + course.difficulty.slice(1).toLowerCase()}
          </span>
        </div>
        <h1 className="text-4xl font-heading font-bold mb-4">{course.title}</h1>
        <p className="text-lg text-nxted-muted mb-4">{course.description}</p>
        <div className="flex items-center gap-6 text-sm text-nxted-muted">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {course.creator.name}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {course.lessons.length} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.durationMin} min
          </span>
          {course.avgRating && (
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {course.avgRating.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      {/* Enroll CTA */}
      {!enrollment && userId && (
        <Card className="bg-nxted-card border-nxted-border mb-8">
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <p className="font-medium">
                {course.isFree ? "This course is free!" : `Unlock for £${course.price ?? "9.99/mo"}`}
              </p>
              <p className="text-sm text-nxted-muted">Start learning today</p>
            </div>
            <Button asChild>
              <Link href={course.lessons[0] ? `/learn/${course.slug}/${course.lessons[0].slug}` : "#"}>
                <PlayCircle className="h-4 w-4 mr-2" />
                Start Course
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Lessons list */}
      <h2 className="text-2xl font-heading font-bold mb-4">Lessons</h2>
      <div className="space-y-3">
        {course.lessons.map((lesson, idx) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isAccessible = lesson.isFree || userPlan !== "FREE";

          return (
            <Link
              key={lesson.id}
              href={isAccessible ? `/learn/${course.slug}/${lesson.slug}` : "#"}
              className="block"
            >
              <Card
                className={`bg-nxted-card border-nxted-border transition-colors ${
                  isAccessible ? "hover:border-brand-primary cursor-pointer" : "opacity-60"
                }`}
              >
                <CardContent className="py-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-nxted-card-alt flex items-center justify-center text-sm font-medium shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-nxted-green" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{lesson.title}</p>
                    <p className="text-xs text-nxted-muted">{lesson.estimatedMinutes} min</p>
                  </div>
                  {!isAccessible && (
                    <Lock className="h-4 w-4 text-nxted-muted shrink-0" />
                  )}
                  {lesson.isFree && !isCompleted && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full shrink-0">
                      Free
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
