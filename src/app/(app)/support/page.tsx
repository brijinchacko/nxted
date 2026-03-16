"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Ticket, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TicketItem {
  id: string;
  subject: string;
  category: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  OPEN: { label: "Open", color: "bg-blue-500/20 text-blue-400", icon: AlertCircle },
  IN_PROGRESS: { label: "In Progress", color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
  RESOLVED: { label: "Resolved", color: "bg-green-500/20 text-green-400", icon: CheckCircle },
  CLOSED: { label: "Closed", color: "bg-gray-500/20 text-gray-400", icon: CheckCircle },
};

const priorityColor: Record<string, string> = {
  LOW: "bg-green-500/20 text-green-400",
  MEDIUM: "bg-yellow-500/20 text-yellow-400",
  HIGH: "bg-orange-500/20 text-orange-400",
  URGENT: "bg-red-500/20 text-red-400",
};

export default function SupportPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tickets")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTickets(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Support Tickets</h1>
          <p className="text-nxted-muted">Track your support requests</p>
        </div>
        <Link href="/support/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-16 text-nxted-muted">Loading tickets...</div>
      ) : tickets.length === 0 ? (
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="flex flex-col items-center py-16">
            <Ticket className="h-12 w-12 text-nxted-muted mb-4" />
            <p className="text-nxted-muted mb-4">No tickets yet</p>
            <Link href="/support/new">
              <Button>Create Your First Ticket</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => {
            const sc = statusConfig[ticket.status] || statusConfig.OPEN;
            const StatusIcon = sc.icon;
            return (
              <Link key={ticket.id} href={`/support/${ticket.id}`}>
                <Card className="bg-nxted-card border-nxted-border hover:border-brand-primary/50 transition-colors cursor-pointer mb-3">
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <StatusIcon className="h-5 w-5 shrink-0 text-nxted-muted" />
                      <div className="min-w-0">
                        <p className="font-medium truncate">{ticket.subject}</p>
                        <p className="text-sm text-nxted-muted">
                          {ticket.category.replace(/_/g, " ")} &middot;{" "}
                          {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={priorityColor[ticket.priority]}>{ticket.priority}</Badge>
                      <Badge className={sc.color}>{sc.label}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
