"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

const categories = [
  { value: "GENERAL", label: "General" },
  { value: "TECHNICAL", label: "Technical Issue" },
  { value: "BILLING", label: "Billing" },
  { value: "COURSE_CONTENT", label: "Course Content" },
  { value: "ACCOUNT", label: "Account" },
  { value: "FEATURE_REQUEST", label: "Feature Request" },
];

const priorities = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
];

export default function NewTicketPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    subject: "",
    description: "",
    category: "GENERAL",
    priority: "MEDIUM",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.description.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create ticket");
      }

      const ticket = await res.json();
      router.push(`/support/${ticket.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/support" className="inline-flex items-center gap-2 text-sm text-nxted-muted hover:text-nxted-dark mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Tickets
      </Link>

      <Card className="bg-nxted-card border-nxted-border">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Raise a Support Ticket</CardTitle>
          <p className="text-nxted-muted text-sm">Describe your issue and our team will get back to you.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">Subject *</label>
              <Input
                placeholder="Brief summary of your issue"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="bg-nxted-bg border-nxted-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border border-nxted-border bg-nxted-bg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full rounded-lg border border-nxted-border bg-nxted-bg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  {priorities.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Description *</label>
              <textarea
                placeholder="Please describe your issue in detail..."
                rows={6}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-lg border border-nxted-border bg-nxted-bg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting..." : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Ticket
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
