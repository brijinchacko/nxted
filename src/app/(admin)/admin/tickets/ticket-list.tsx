"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Ticket, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TicketItem {
  id: string;
  subject: string;
  category: string;
  status: string;
  priority: string;
  createdAt: string;
  user: { name: string | null; email: string };
  _count: { replies: number };
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

const statuses = ["ALL", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

export function AdminTicketList({ tickets: initialTickets }: { tickets: TicketItem[] }) {
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" ? initialTickets : initialTickets.filter((t) => t.status === filter);

  const counts = {
    ALL: initialTickets.length,
    OPEN: initialTickets.filter((t) => t.status === "OPEN").length,
    IN_PROGRESS: initialTickets.filter((t) => t.status === "IN_PROGRESS").length,
    RESOLVED: initialTickets.filter((t) => t.status === "RESOLVED").length,
    CLOSED: initialTickets.filter((t) => t.status === "CLOSED").length,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-nxted-muted hover:text-nxted-dark mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Admin
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">Support Tickets</h1>
          <p className="text-nxted-muted">{initialTickets.length} total tickets</p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {statuses.map((s) => (
          <Button
            key={s}
            variant={filter === s ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(s)}
          >
            {s.replace(/_/g, " ")} ({counts[s as keyof typeof counts]})
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="flex flex-col items-center py-16">
            <Ticket className="h-12 w-12 text-nxted-muted mb-4" />
            <p className="text-nxted-muted">No tickets found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((ticket) => (
            <Link key={ticket.id} href={`/admin/tickets/${ticket.id}`}>
              <Card className="bg-nxted-card border-nxted-border hover:border-brand-primary/50 transition-colors cursor-pointer mb-3">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{ticket.subject}</p>
                      <p className="text-sm text-nxted-muted">
                        {ticket.user.name || ticket.user.email} &middot;{" "}
                        {ticket.category.replace(/_/g, " ")} &middot;{" "}
                        {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      {ticket._count.replies > 0 && (
                        <span className="flex items-center gap-1 text-xs text-nxted-muted">
                          <MessageSquare className="h-3 w-3" />
                          {ticket._count.replies}
                        </span>
                      )}
                      <Badge className={priorityColor[ticket.priority]}>{ticket.priority}</Badge>
                      <Badge className={statusColor[ticket.status]}>{ticket.status.replace(/_/g, " ")}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
