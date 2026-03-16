import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { safeAuth } from "@/lib/clerk";

// GET /api/tickets/[id] — get ticket with replies
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { userId: clerkId } = await safeAuth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const ticket = await db.ticket.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, avatarUrl: true } },
      replies: {
        include: { user: { select: { name: true, email: true, avatarUrl: true, role: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });

  const isAdmin = user.role === "ADMIN" || user.role === "ORG_ADMIN";
  if (ticket.userId !== user.id && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(ticket);
}

// PATCH /api/tickets/[id] — update ticket status (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { userId: clerkId } = await safeAuth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (user.role !== "ADMIN" && user.role !== "ORG_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { status, priority } = body;

  const data: Record<string, string> = {};
  if (status) data.status = status;
  if (priority) data.priority = priority;

  const ticket = await db.ticket.update({ where: { id }, data });

  return NextResponse.json(ticket);
}
