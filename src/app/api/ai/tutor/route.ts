import { safeAuth } from "@/lib/clerk";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { chatWithAITutor } from "@/lib/openrouter";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { userId } = await safeAuth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Rate limit based on plan
    const maxRequests = user.plan === "FREE" ? 20 : 100;
    const windowMs = 60 * 60 * 1000; // 1 hour
    const { success, remaining, resetAt } = rateLimit(
      user.id,
      maxRequests,
      windowMs
    );

    if (!success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          remaining,
          resetAt: new Date(resetAt).toISOString(),
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages, lessonContext, lessonId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const conversationHistory = messages.slice(0, -1);

    // Prepend lesson context if provided
    const userContent = lessonContext
      ? `[Lesson context: ${lessonContext}]\n\n${lastMessage.content}`
      : lastMessage.content;

    const aiResponse = await chatWithAITutor(userContent, conversationHistory);

    // Save session to DB
    const updatedMessages = [
      ...messages,
      { role: "assistant", content: aiResponse },
    ];

    await db.aITutorSession.create({
      data: {
        userId: user.id,
        lessonId: lessonId || null,
        messages: updatedMessages,
      },
    });

    return NextResponse.json({
      response: aiResponse,
      remaining,
    });
  } catch (error) {
    console.error("[AI_TUTOR_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to get AI tutor response" },
      { status: 500 }
    );
  }
}
