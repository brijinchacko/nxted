import { safeAuth } from "@/lib/clerk";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, BookOpen, DollarSign, Users, BarChart3 } from "lucide-react";

export const metadata = { title: "Creator Studio" };

export default async function StudioPage() {
  const { userId } = await safeAuth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user || !user.isCreator) redirect("/dashboard");

  const courses = await db.course.findMany({
    where: { creatorId: user.id },
    include: { topic: true, _count: { select: { lessons: true, enrollments: true } } },
    orderBy: { updatedAt: "desc" },
  });

  const totalEnrollments = courses.reduce((s, c) => s + c._count.enrollments, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold">Creator Studio</h1>
        <Button asChild>
          <Link href="/studio/courses/new">
            <Plus className="h-4 w-4 mr-2" />
            New Course
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="pt-6">
            <BookOpen className="h-6 w-6 text-brand-primary mb-2" />
            <p className="text-3xl font-heading font-bold">{courses.length}</p>
            <p className="text-sm text-nxted-muted">Courses</p>
          </CardContent>
        </Card>
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="pt-6">
            <Users className="h-6 w-6 text-nxted-purple mb-2" />
            <p className="text-3xl font-heading font-bold">{totalEnrollments}</p>
            <p className="text-sm text-nxted-muted">Total Enrollments</p>
          </CardContent>
        </Card>
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="pt-6">
            <DollarSign className="h-6 w-6 text-nxted-green mb-2" />
            <p className="text-3xl font-heading font-bold">£0.00</p>
            <p className="text-sm text-nxted-muted">Earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Courses list */}
      <h2 className="text-xl font-heading font-bold mb-4">Your Courses</h2>
      {courses.length === 0 ? (
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 text-nxted-muted mx-auto mb-4" />
            <p className="text-nxted-muted mb-4">You haven&apos;t created any courses yet.</p>
            <Button asChild>
              <Link href="/studio/courses/new">Create Your First Course</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {courses.map((course) => (
            <Link key={course.id} href={`/studio/courses/${course.id}/edit`}>
              <Card className="bg-nxted-card border-nxted-border hover:border-brand-primary transition-colors cursor-pointer">
                <CardContent className="py-4 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{course.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          course.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {course.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-nxted-muted">
                      {course._count.lessons} lessons · {course._count.enrollments} enrollments
                    </p>
                  </div>
                  <BarChart3 className="h-5 w-5 text-nxted-muted" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
