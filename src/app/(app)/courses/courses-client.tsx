"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, BookOpen, Clock, Star, Lock, Sparkles } from "lucide-react";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  durationMin: number;
  isFree: boolean;
  price: number | null;
  avgRating: number | null;
  enrollmentCount: number;
  lessonCount: number;
  topic: { name: string; slug: string; icon: string | null; color: string | null };
  creator: { name: string | null };
}

interface TopicFilter {
  slug: string;
  name: string;
  icon: string | null;
}

export function CoursesClient({
  courses,
  topics,
}: {
  courses: Course[];
  topics: TopicFilter[];
}) {
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filtered = courses.filter((c) => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedTopic && c.topic.slug !== selectedTopic) return false;
    if (selectedDifficulty && c.difficulty !== selectedDifficulty) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-6">Explore Courses</h1>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-nxted-muted" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Topic pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedTopic(null)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm transition-colors",
            !selectedTopic
              ? "bg-brand-primary text-white"
              : "bg-nxted-card-alt text-nxted-dark hover:bg-nxted-border"
          )}
        >
          All Topics
        </button>
        {topics.map((t) => (
          <button
            key={t.slug}
            onClick={() => setSelectedTopic(t.slug === selectedTopic ? null : t.slug)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm transition-colors",
              selectedTopic === t.slug
                ? "bg-brand-primary text-white"
                : "bg-nxted-card-alt text-nxted-dark hover:bg-nxted-border"
            )}
          >
            {t.icon} {t.name}
          </button>
        ))}
      </div>

      {/* Difficulty pills */}
      <div className="flex gap-2 mb-8">
        {["BEGINNER", "INTERMEDIATE", "ADVANCED"].map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDifficulty(d === selectedDifficulty ? null : d)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm transition-colors",
              selectedDifficulty === d
                ? "bg-brand-primary text-white"
                : "bg-nxted-card-alt text-nxted-dark hover:bg-nxted-border"
            )}
          >
            {d.charAt(0) + d.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <Link key={course.id} href={`/courses/${course.slug}`}>
            <Card className="bg-nxted-card border-nxted-border hover:border-brand-primary transition-colors cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: course.topic.color ?? "#e8491d" }}
                  />
                  <span className="text-xs text-nxted-muted">{course.topic.name}</span>
                  {course.isFree ? (
                    <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  ) : (
                    <span className="ml-auto text-xs text-nxted-muted flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      {course.price ? `£${course.price}` : "Pro"}
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-nxted-muted line-clamp-2 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-xs text-nxted-muted">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.lessonCount} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.durationMin}min
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      {course.difficulty.charAt(0) + course.difficulty.slice(1).toLowerCase()}
                    </span>
                  </div>
                  {course.avgRating && (
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {course.avgRating.toFixed(1)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-nxted-muted">
          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No courses found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
