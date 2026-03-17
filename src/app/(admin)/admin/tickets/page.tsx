import { safeAuth } from "@/lib/clerk";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { AdminTicketList } from "./ticket-list";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — Support Tickets" };

export default async function AdminTicketsPage() {
  const { userId } = await safeAuth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user || (user.role !== "ADMIN" && user.role !== "ORG_ADMIN")) {
    redirect("/dashboard");
  }

  const tickets = await db.ticket.findMany({
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { replies: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Serialize to convert Date objects to strings for client component
  const serialized = JSON.parse(JSON.stringify(tickets));

  return <AdminTicketList tickets={serialized} />;
}
