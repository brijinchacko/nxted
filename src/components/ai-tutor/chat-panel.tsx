"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./chat-message";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatPanelProps {
  lessonContext?: string;
  lessonId?: string;
}

const suggestedQuestions = [
  "Can you explain this concept in simpler terms?",
  "Give me a real-world example",
  "What are the key takeaways?",
  "Quiz me on this topic",
];

export function ChatPanel({ lessonContext, lessonId }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          lessonContext,
          lessonId,
          history: messages,
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "Sorry, I couldn't generate a response.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-nxted-border bg-nxted-card">
      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto p-4"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 py-8">
            <div className="text-center">
              <p className="font-heading text-lg font-semibold text-nxted-dark">
                AI Tutor
              </p>
              <p className="text-sm text-nxted-muted">
                Ask me anything about this lesson
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-nxted-border bg-nxted-surface px-3 py-1.5 text-xs text-nxted-muted transition-colors hover:border-brand-primary/30 hover:text-nxted-dark"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-nxted-border bg-nxted-card px-4 py-3 text-sm text-nxted-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-nxted-border p-3"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
