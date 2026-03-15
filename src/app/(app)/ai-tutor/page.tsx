"use client";

import { ChatPanel } from "@/components/ai-tutor/chat-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

export default function AITutorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="h-8 w-8 text-brand-primary" />
        <div>
          <h1 className="text-3xl font-heading font-bold">AI Tutor</h1>
          <p className="text-nxted-muted">Ask me anything about your courses</p>
        </div>
      </div>

      <Card className="bg-nxted-card border-nxted-border">
        <CardContent className="pt-6">
          <ChatPanel />
        </CardContent>
      </Card>
    </div>
  );
}
