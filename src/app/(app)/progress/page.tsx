import { safeAuth } from "@/lib/clerk";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Trophy, Clock, BookOpen, Brain, Target } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = { title: "Progress" };

export default async function ProgressPage() {
  const { userId } = await safeAuth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      lessonProgress: { where: { status: "COMPLETED" } },
      quizAttempts: true,
      certificates: true,
      spacedRepCards: { where: { nextReviewAt: { lte: new Date() } } },
    },
  });

  if (!user) redirect("/sign-up");

  const totalLessons = user.lessonProgress.length;
  const totalTimeHours = Math.round(
    user.lessonProgress.reduce((sum, lp) => sum + lp.timeSpentSec, 0) / 3600
  );
  const avgQuizScore = user.quizAttempts.length
    ? Math.round(user.quizAttempts.reduce((s, q) => s + q.score, 0) / user.quizAttempts.length)
    : 0;

  const stats = [
    { label: "Current Streak", value: user.streakCount, icon: Flame, color: "text-brand-primary" },
    { label: "Best Streak", value: user.bestStreak, icon: Trophy, color: "text-yellow-500" },
    { label: "Total XP", value: user.totalXP.toLocaleString(), icon: Target, color: "text-nxted-purple" },
    { label: "Lessons Completed", value: totalLessons, icon: BookOpen, color: "text-nxted-green" },
    { label: "Hours Learning", value: totalTimeHours, icon: Clock, color: "text-blue-400" },
    { label: "Avg Quiz Score", value: `${avgQuizScore}%`, icon: Brain, color: "text-nxted-peach" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-8">Your Progress</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-nxted-card border-nxted-border">
            <CardContent className="pt-6">
              <stat.icon className={`h-6 w-6 mb-2 ${stat.color}`} />
              <p className="text-3xl font-heading font-bold">{stat.value}</p>
              <p className="text-sm text-nxted-muted">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Spaced Rep */}
      <Card className="bg-nxted-card border-nxted-border mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Spaced Repetition Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-nxted-muted">
            {user.spacedRepCards.length > 0
              ? `You have ${user.spacedRepCards.length} cards due for review today.`
              : "No cards due for review. Great job staying on top of your reviews!"}
          </p>
        </CardContent>
      </Card>

      {/* Certificates */}
      {user.certificates.length > 0 && (
        <section>
          <h2 className="text-2xl font-heading font-bold mb-4">Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.certificates.map((cert) => (
              <Card key={cert.id} className="bg-nxted-card border-nxted-border">
                <CardContent className="pt-6">
                  <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                  <h3 className="font-medium">{cert.courseName}</h3>
                  <p className="text-sm text-nxted-muted">
                    Issued {new Date(cert.issuedAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-nxted-muted mt-1">
                    Code: {cert.verificationCode}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
