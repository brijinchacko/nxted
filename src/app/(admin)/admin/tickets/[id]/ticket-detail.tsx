"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, User, Shield } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Reply {
  id: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
  user: { name: string | null; email: string; role: string };
}

interface TicketData {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  createdAt: string;
  user: { name: string | null; email: string };
  replies: Reply[];
}

const statusOptions = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];
const priorityOptions = ["LOW", "MEDIUM", "HIGH", "URGENT"];

const statusColor: Record<string, string> = {
  OPEN: "bg-blue-500/20 text-blue-400",
  IN_PROGRESS: "bg-yellow-500/20 text-yellow-400",
  RESOLVED: "bg-green-500/20 text-green-400",
  CLOSED: "bg-gray-500/20 text-gray-400",
};

const priorityColor: Record<string, string> = {
  LOW: "bg-green-500/20 text-green-400",
  MEDIUM: "bg-yellow-500/20 text-yellow-400",
  HIGH: "bg-orange-500/20 text-orange-400",
  URGENT: "bg-red-500/20 text-red-400",
};

export function AdminTicketDetail({ ticket: initialTicket }: { ticket: TicketData }) {
  const router = useRouter();
  const [ticket, setTicket] = useState(initialTicket);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [updating, setUpdating] = useState(false);

  const updateTicket = async (data: { status?: string; priority?: string }) => {
    setUpdating(true);
    const res = await fetch(`/api/tickets/${ticket.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await res.json();
      setTicket((prev) => ({ ...prev, ...updated }));
    }
    setUpdating(false);
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSending(true);

    const res = await fetch(`/api/tickets/${ticket.id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: replyText }),
    });

    if (res.ok) {
      setReplyText("");
      router.refresh();
      // Refetch for client state
      const ticketRes = await fetch(`/api/tickets/${ticket.id}`);
      if (ticketRes.ok) setTicket(await ticketRes.json());
    }
    setSending(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/admin/tickets" className="inline-flex items-center gap-2 text-sm text-nxted-muted hover:text-nxted-dark mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Tickets
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-nxted-card border-nxted-border">
            <CardHeader>
              <CardTitle className="text-xl font-heading">{ticket.subject}</CardTitle>
              <p className="text-sm text-nxted-muted">
                From: {ticket.user.name || ticket.user.email} &middot;{" "}
                {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-nxted-bg rounded-lg p-4 whitespace-pre-wrap text-sm">{ticket.description}</div>
            </CardContent>
          </Card>

          {/* Replies */}
          {ticket.replies.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-nxted-muted uppercase tracking-wider">Conversation</h3>
              {ticket.replies.map((reply) => (
                <Card
                  key={reply.id}
                  className={`border ${reply.isAdmin ? "bg-brand-primary/5 border-brand-primary/20" : "bg-nxted-card border-nxted-border"}`}
                >
                  <CardContent className="py-3">
                    <div className="flex items-center gap-2 mb-2">
                      {reply.isAdmin ? (
                        <Shield className="h-4 w-4 text-brand-primary" />
                      ) : (
                        <User className="h-4 w-4 text-nxted-muted" />
                      )}
                      <span className="text-sm font-medium">{reply.user.name || reply.user.email}</span>
                      {reply.isAdmin && <Badge className="bg-brand-primary/20 text-brand-primary text-xs">Admin</Badge>}
                      <span className="text-xs text-nxted-muted ml-auto">
                        {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{reply.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Reply form */}
          <Card className="bg-nxted-card border-nxted-border">
            <CardContent className="pt-4">
              <form onSubmit={handleReply} className="space-y-3">
                <label className="text-sm font-medium">Admin Reply</label>
                <textarea
                  placeholder="Type your reply to the user..."
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full rounded-lg border border-nxted-border bg-nxted-bg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                />
                <Button type="submit" disabled={sending || !replyText.trim()} size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  {sending ? "Sending..." : "Send Reply"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="bg-nxted-card border-nxted-border">
            <CardHeader>
              <CardTitle className="text-sm">Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs text-nxted-muted block mb-1">Status</label>
                <select
                  value={ticket.status}
                  onChange={(e) => updateTicket({ status: e.target.value })}
                  disabled={updating}
                  className="w-full rounded-lg border border-nxted-border bg-nxted-bg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-nxted-muted block mb-1">Priority</label>
                <select
                  value={ticket.priority}
                  onChange={(e) => updateTicket({ priority: e.target.value })}
                  disabled={updating}
                  className="w-full rounded-lg border border-nxted-border bg-nxted-bg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  {priorityOptions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-nxted-muted block mb-1">Category</label>
                <Badge className="bg-nxted-bg">{ticket.category.replace(/_/g, " ")}</Badge>
              </div>

              <div>
                <label className="text-xs text-nxted-muted block mb-1">User</label>
                <p className="text-sm">{ticket.user.name || "—"}</p>
                <p className="text-xs text-nxted-muted">{ticket.user.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
