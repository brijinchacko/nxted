import { safeAuth } from "@/lib/clerk";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateAudio } from "@/lib/elevenlabs";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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

    // Must be creator or Pro plan
    const isCreator = user.role === "CREATOR" || user.role === "ADMIN";
    const isPro = user.plan !== "FREE";

    if (!isCreator && !isPro) {
      return NextResponse.json(
        { error: "Audio generation requires creator role or Pro plan" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { text, lessonId } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "text is required" },
        { status: 400 }
      );
    }

    if (!lessonId || typeof lessonId !== "string") {
      return NextResponse.json(
        { error: "lessonId is required" },
        { status: 400 }
      );
    }

    // Verify lesson exists
    const lesson = await db.lesson.findUnique({
      where: { id: lessonId },
      include: { course: true },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    // If creator, verify they own the course
    if (isCreator && lesson.course.creatorId !== user.id) {
      return NextResponse.json(
        { error: "You can only generate audio for your own lessons" },
        { status: 403 }
      );
    }

    const audioBuffer = await generateAudio(text);

    // Save audio file
    const audioDir = path.join(process.cwd(), "public", "audio", "lessons");
    await mkdir(audioDir, { recursive: true });

    const filePath = path.join(audioDir, `${lessonId}.mp3`);
    await writeFile(filePath, audioBuffer);

    const audioUrl = `/audio/lessons/${lessonId}.mp3`;

    // Update lesson with audio URL
    await db.lesson.update({
      where: { id: lessonId },
      data: { audioUrl },
    });

    return NextResponse.json({ audioUrl });
  } catch (error) {
    console.error("[AUDIO_GENERATE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to generate audio" },
      { status: 500 }
    );
  }
}
