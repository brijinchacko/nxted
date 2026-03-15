"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StreakWidget } from "@/components/dashboard/streak-widget";
import { XPDisplay } from "@/components/dashboard/xp-display";
import {
  BookOpen,
  Brain,
  ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react";

interface DashboardProps {
  user: {
    name: string | null;
    streakCount: number;
    bestStreak: number;
    totalXP: number;
    lastStudyDate: string | null;
    plan: string;
    studyTimeMinutes: number;
  };
  enrollments: {
    id: string;
    progress: number;
    course: {
      title: string;
      slug: string;
      topic: { name: string; icon: string | null };
    };
  }[];
  spacedRepDueCount: number;
  recommendedCourses: {
    id: string;
    title: string;
    slug: string;
    description: string;
    difficulty: string;
    durationMin: number;
    isFree: boolean;
    topic: { name: string; icon: string | null; color: string | null };
    creator: { name: string | null };
  }[];
}

export function DashboardClient({
  user,
  enrollments,
  spacedRepDueCount,
  recommendedCourses,
}: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-heading font-bold">
          Welcome back{user.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-nxted-muted mt-1">
          Ready for your daily {user.studyTimeMinutes}-minute session?
        </p>
      </div>

      {/* Top row: Streak + XP + Spaced Rep */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StreakWidget
          streakCount={user.streakCount}
          bestStreak={user.bestStreak}
          lastStudyDate={user.lastStudyDate}
        />
        <XPDisplay totalXP={user.totalXP} />
        <Card className="bg-nxted-card border-nxted-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-nxted-muted flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Spaced Repetition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-heading font-bold">{spacedRepDueCount}</p>
            <p className="text-sm text-nxted-muted">cards due for review</p>
            {spacedRepDueCount > 0 && (
              <Button size="sm" className="mt-3" asChild>
                <Link href="/review">Review Now</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      {enrollments.length > 0 && (
        <section>
          <h2 className="text-xl font-heading font-bold mb-4">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrollments.map((enrollment) => (
              <Link key={enrollment.id} href={`/courses/${enrollment.course.slug}`}>
                <Card className="bg-nxted-card border-nxted-border hover:border-brand-primary transition-colors cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{enrollment.course.topic.icon}</span>
                      <span className="text-xs text-nxted-muted">
                        {enrollment.course.topic.name}
                      </span>
                    </div>
                    <h3 className="font-medium mb-3">{enrollment.course.title}</h3>
                    <div className="w-full h-2 rounded-full bg-nxted-surface overflow-hidden">
                      <div
                        className="h-full bg-brand-primary rounded-full transition-all"
                        style={{ width: `${enrollment.progress * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-nxted-muted mt-1">
                      {Math.round(enrollment.progress * 100)}% complete
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recommended Courses */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-bold">Recommended for You</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/courses" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`}>
              <Card className="bg-nxted-card border-nxted-border hover:border-brand-primary transition-colors cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: course.topic.color ?? "#e8491d" }}
                    />
                    <span className="text-xs text-nxted-muted">{course.topic.name}</span>
                    {course.isFree && (
                      <span className="ml-auto text-xs bg-nxted-green/10 text-nxted-green px-2 py-0.5 rounded-full">
                        Free
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium mb-1">{course.title}</h3>
                  <p className="text-sm text-nxted-muted line-clamp-2 mb-3">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-nxted-muted">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      {course.difficulty.charAt(0) + course.difficulty.slice(1).toLowerCase()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.durationMin}min
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.creator.name}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
