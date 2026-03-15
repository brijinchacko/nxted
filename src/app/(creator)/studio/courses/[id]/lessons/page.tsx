"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, GripVertical, Loader2, Eye, EyeOff } from "lucide-react";

export default function ManageLessonsPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setCourse(data.course);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Lessons</h1>
          <p className="text-nxted-muted">{course?.title}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Lesson
        </Button>
      </div>

      <div className="space-y-3">
        {course?.lessons?.length === 0 && (
          <Card className="bg-nxted-card border-nxted-border">
            <CardContent className="py-12 text-center text-nxted-muted">
              No lessons yet. Click &quot;Add Lesson&quot; to get started.
            </CardContent>
          </Card>
        )}
        {course?.lessons?.map((lesson: any, idx: number) => (
          <Card key={lesson.id} className="bg-nxted-card border-nxted-border">
            <CardContent className="py-4 flex items-center gap-4">
              <GripVertical className="h-5 w-5 text-nxted-muted cursor-grab" />
              <span className="w-8 h-8 rounded-full bg-nxted-card-alt flex items-center justify-center text-sm font-medium">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium">{lesson.title}</p>
                <p className="text-xs text-nxted-muted">{lesson.estimatedMinutes} min</p>
              </div>
              {lesson.isPublished ? (
                <Eye className="h-4 w-4 text-nxted-green" />
              ) : (
                <EyeOff className="h-4 w-4 text-nxted-muted" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
