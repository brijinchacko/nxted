import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const course = await db.course.findUnique({
      where: { id },
      include: {
        topic: { select: { id: true, name: true, slug: true, color: true } },
        creator: { select: { id: true, name: true, avatarUrl: true, creatorBio: true } },
        lessons: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            slug: true,
            order: true,
            estimatedMinutes: true,
            isFree: true,
          },
        },
        _count: { select: { enrollments: true } },
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ course });
  } catch (error) {
    console.error("[COURSE_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify user is the course creator
    const course = await db.course.findUnique({
      where: { id },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    if (course.creatorId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You can only edit your own courses" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      title,
      description,
      coverImage,
      difficulty,
      isPublished,
      isFree,
      price,
      topicId,
    } = body;

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (difficulty !== undefined) updateData.difficulty = difficulty;
    if (isPublished !== undefined) updateData.isPublished = isPublished;
    if (isFree !== undefined) updateData.isFree = isFree;
    if (price !== undefined) updateData.price = price;
    if (topicId !== undefined) updateData.topicId = topicId;

    const updatedCourse = await db.course.update({
      where: { id },
      data: updateData,
      include: {
        topic: { select: { id: true, name: true, slug: true } },
        creator: { select: { id: true, name: true, avatarUrl: true } },
      },
    });

    return NextResponse.json({ course: updatedCourse });
  } catch (error) {
    console.error("[COURSE_PATCH_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}
