import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { safeAuth } from "@/lib/clerk";
import { sendTicketNotification } from "@/lib/mail";

// GET /api/tickets — list user's tickets (or all for admin)
export async function GET(req: NextRequest) {
  const { userId: clerkId } = await safeAuth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const isAdmin = user.role === "ADMIN" || user.role === "ORG_ADMIN";
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const where: Record<string, unknown> = isAdmin ? {} : { userId: user.id };
  if (status) where.status = status;

  const tickets = await db.ticket.findMany({
    where,
    include: { user: { select: { name: true, email: true, avatarUrl: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tickets);
}

// POST /api/tickets — create a new ticket
export async function POST(req: NextRequest) {
  const { userId: clerkId } = await safeAuth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  const { subject, description, category, priority } = body;

  if (!subject?.trim() || !description?.trim()) {
    return NextResponse.json({ error: "Subject and description are required" }, { status: 400 });
  }

  const ticket = await db.ticket.create({
    data: {
      userId: user.id,
      subject: subject.trim(),
      description: description.trim(),
      category: category || "GENERAL",
      priority: priority || "MEDIUM",
    },
  });

  // Send email notification to admin (fire-and-forget)
  sendTicketNotification({
    ticketId: ticket.id,
    subject: ticket.subject,
    category: ticket.category,
    priority: ticket.priority,
    userName: user.name || "Unknown",
    userEmail: user.email,
    description: ticket.description,
  }).catch((err) => console.error("[mail] Failed to send ticket notification:", err));

  return NextResponse.json(ticket, { status: 201 });
}
