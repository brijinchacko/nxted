import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

/**
 * Safe wrapper around Clerk's auth() that returns { userId: null }
 * when Clerk is not configured instead of throwing.
 */
export async function safeAuth(): Promise<{ userId: string | null }> {
  try {
    return await auth();
  } catch {
    return { userId: null };
  }
}

export async function getCurrentUser() {
  const { userId } = await safeAuth();

  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
  });

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
