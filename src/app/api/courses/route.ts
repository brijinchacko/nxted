import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const topic = searchParams.get("topic");
    const difficulty = searchParams.get("difficulty");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";

    const where: Record<string, unknown> = {
      isPublished: true,
    };

    if (topic) {
      where.topic = { slug: topic };
    }

    if (difficulty) {
      where.difficulty = difficulty.toUpperCase();
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    let orderBy: Record<string, string>;
    switch (sort) {
      case "popular":
        orderBy = { enrollmentCount: "desc" };
        break;
      case "rating":
        orderBy = { avgRating: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "newest":
      default:
        orderBy = { createdAt: "desc" };
        break;
    }

    const courses = await db.course.findMany({
      where,
      orderBy,
      include: {
        topic: { select: { id: true, name: true, slug: true, color: true } },
        creator: { select: { id: true, name: true, avatarUrl: true } },
        _count: { select: { lessons: true } },
      },
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("[COURSES_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.role !== "CREATOR" && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only creators can create courses" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, description, topicId, difficulty, coverImage, isFree, price } = body;

    if (!title || !description || !topicId) {
      return NextResponse.json(
        { error: "title, description, and topicId are required" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check for slug uniqueness
    const existing = await db.course.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const course = await db.course.create({
      data: {
        title,
        slug: finalSlug,
        description,
        topicId,
        creatorId: user.id,
        difficulty: difficulty || "BEGINNER",
        coverImage: coverImage || null,
        isFree: isFree || false,
        price: price || null,
      },
      include: {
        topic: { select: { id: true, name: true, slug: true } },
        creator: { select: { id: true, name: true, avatarUrl: true } },
      },
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    console.error("[COURSES_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
