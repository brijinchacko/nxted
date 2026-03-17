import { safeAuth } from "@/lib/clerk";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { AdminTicketDetail } from "./ticket-detail";

export const dynamic = "force-dynamic";

export default async function AdminTicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId } = await safeAuth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user || (user.role !== "ADMIN" && user.role !== "ORG_ADMIN")) {
    redirect("/dashboard");
  }

  const ticket = await db.ticket.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, avatarUrl: true } },
      replies: {
        include: { user: { select: { name: true, email: true, role: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!ticket) redirect("/admin/tickets");

  // Serialize to convert Date objects to strings for client component
  const serialized = JSON.parse(JSON.stringify(ticket));

  return <AdminTicketDetail ticket={serialized} />;
}
