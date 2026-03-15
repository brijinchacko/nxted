import { safeAuth } from "@/lib/clerk";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, BarChart3, Settings, Download } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin Dashboard" };

export default async function AdminPage() {
  const { userId } = await safeAuth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: { organisation: true },
  });

  if (!user || (user.role !== "ORG_ADMIN" && user.role !== "ADMIN")) {
    redirect("/dashboard");
  }

  const orgMembers = user.organisationId
    ? await db.user.findMany({ where: { organisationId: user.organisationId } })
    : [];

  const completedCount = user.organisationId
    ? await db.lessonProgress.count({
        where: { userId: { in: orgMembers.map((m) => m.id) }, status: "COMPLETED" },
      })
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
          <p className="text-nxted-muted">{user.organisation?.name ?? "Organisation"}</p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="pt-6">
            <Users className="h-6 w-6 text-brand-primary mb-2" />
            <p className="text-3xl font-heading font-bold">{orgMembers.length}</p>
            <p className="text-sm text-nxted-muted">Team Members</p>
          </CardContent>
        </Card>
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="pt-6">
            <BookOpen className="h-6 w-6 text-nxted-green mb-2" />
            <p className="text-3xl font-heading font-bold">{completedCount}</p>
            <p className="text-sm text-nxted-muted">Lessons Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="pt-6">
            <BarChart3 className="h-6 w-6 text-nxted-purple mb-2" />
            <p className="text-3xl font-heading font-bold">
              {orgMembers.length > 0 ? Math.round(completedCount / orgMembers.length) : 0}
            </p>
            <p className="text-sm text-nxted-muted">Avg Lessons/Member</p>
          </CardContent>
        </Card>
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="pt-6">
            <Download className="h-6 w-6 text-nxted-orange mb-2" />
            <Button variant="outline" size="sm" className="mt-2">
              Export CSV
            </Button>
            <p className="text-sm text-nxted-muted mt-1">Download Report</p>
          </CardContent>
        </Card>
      </div>

      {/* Team members */}
      <Card className="bg-nxted-card border-nxted-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orgMembers.length === 0 ? (
            <p className="text-nxted-muted text-center py-8">
              No team members yet. Invite members to get started.
            </p>
          ) : (
            <div className="divide-y divide-nxted-border">
              {orgMembers.map((member) => (
                <div key={member.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{member.name ?? member.email}</p>
                    <p className="text-sm text-nxted-muted">{member.email}</p>
                  </div>
                  <span className="text-xs bg-nxted-card-alt px-2 py-1 rounded-full">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
