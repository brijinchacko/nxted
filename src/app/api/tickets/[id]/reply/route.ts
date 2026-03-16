import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { safeAuth } from "@/lib/clerk";
import { sendTicketReplyNotification } from "@/lib/mail";

// POST /api/tickets/[id]/reply — add a reply to a ticket
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { userId: clerkId } = await safeAuth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const ticket = await db.ticket.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });

  const isAdmin = user.role === "ADMIN" || user.role === "ORG_ADMIN";
  if (ticket.userId !== user.id && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { message } = body;

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const reply = await db.ticketReply.create({
    data: {
      ticketId: id,
      userId: user.id,
      message: message.trim(),
      isAdmin,
    },
    include: { user: { select: { name: true, email: true, avatarUrl: true, role: true } } },
  });

  // If admin replies, update ticket status to IN_PROGRESS and notify user
  if (isAdmin) {
    await db.ticket.update({ where: { id }, data: { status: "IN_PROGRESS" } });

    sendTicketReplyNotification({
      ticketId: id,
      subject: ticket.subject,
      replyMessage: message.trim(),
      userEmail: ticket.user.email,
      userName: ticket.user.name || "User",
    }).catch((err) => console.error("[mail] Failed to send reply notification:", err));
  }

  return NextResponse.json(reply, { status: 201 });
}
