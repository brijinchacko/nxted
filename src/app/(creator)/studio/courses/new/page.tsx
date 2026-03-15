"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Topic {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

export default function NewCoursePage() {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topicId, setTopicId] = useState("");
  const [difficulty, setDifficulty] = useState("BEGINNER");
  const [isFree, setIsFree] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/courses?topicsOnly=true")
      .then((r) => r.json())
      .then((data) => setTopics(data.topics ?? []))
      .catch(() => {});
  }, []);

  const handleCreate = async () => {
    setSaving(true);
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, topicId, difficulty, isFree }),
    });
    const data = await res.json();
    if (data.course) {
      router.push(`/studio/courses/${data.course.id}/lessons`);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-8">Create New Course</h1>

      <Card className="bg-nxted-card border-nxted-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <label className="text-sm font-medium mb-1 block">Course Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Introduction to Public Speaking"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will learners gain from this course?"
              className="w-full rounded-xl border border-nxted-border bg-nxted-bg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Topic</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTopicId(t.id)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm border transition-colors",
                    topicId === t.id
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-nxted-border hover:border-nxted-muted"
                  )}
                >
                  {t.icon} {t.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Difficulty</label>
            <div className="flex gap-2">
              {["BEGINNER", "INTERMEDIATE", "ADVANCED"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm transition-colors",
                    difficulty === d
                      ? "bg-brand-primary text-white"
                      : "bg-nxted-card-alt hover:bg-nxted-border"
                  )}
                >
                  {d.charAt(0) + d.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFree"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="isFree" className="text-sm">
              Make this course free
            </label>
          </div>

          <Button
            onClick={handleCreate}
            disabled={!title || !description || !topicId || saving}
            className="w-full"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <ArrowRight className="h-4 w-4 mr-2" />
            )}
            Create Course & Add Lessons
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
