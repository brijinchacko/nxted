"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

interface TicketDetail {
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

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  const fetchTicket = () => {
    fetch(`/api/tickets/${id}`)
      .then((r) => r.json())
      .then(setTicket)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchTicket(); }, [id]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSending(true);

    const res = await fetch(`/api/tickets/${id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: replyText }),
    });

    if (res.ok) {
      setReplyText("");
      fetchTicket();
    }
    setSending(false);
  };

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-nxted-muted">Loading ticket...</div>;
  }

  if (!ticket) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-nxted-muted">Ticket not found.</div>;
  }

  const isClosed = ticket.status === "CLOSED" || ticket.status === "RESOLVED";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/support" className="inline-flex items-center gap-2 text-sm text-nxted-muted hover:text-nxted-dark mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Tickets
      </Link>

      {/* Ticket header */}
      <Card className="bg-nxted-card border-nxted-border mb-6">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-heading">{ticket.subject}</CardTitle>
              <p className="text-sm text-nxted-muted mt-1">
                {ticket.category.replace(/_/g, " ")} &middot; Created{" "}
                {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Badge className={priorityColor[ticket.priority]}>{ticket.priority}</Badge>
              <Badge className={statusColor[ticket.status]}>{ticket.status.replace(/_/g, " ")}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-nxted-bg rounded-lg p-4 whitespace-pre-wrap text-sm">{ticket.description}</div>
        </CardContent>
      </Card>

      {/* Replies */}
      {ticket.replies.length > 0 && (
        <div className="space-y-3 mb-6">
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
      {!isClosed ? (
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="pt-4">
            <form onSubmit={handleReply} className="space-y-3">
              <textarea
                placeholder="Type your reply..."
                rows={3}
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
      ) : (
        <p className="text-center text-nxted-muted text-sm py-4">This ticket is {ticket.status.toLowerCase()}.</p>
      )}
    </div>
  );
}
