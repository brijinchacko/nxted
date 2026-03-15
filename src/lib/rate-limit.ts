interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function cleanExpiredEntries(
  entry: RateLimitEntry,
  windowMs: number
): number[] {
  const now = Date.now();
  return entry.timestamps.filter((ts) => now - ts < windowMs);
}

export function rateLimit(
  userId: string,
  maxRequests: number,
  windowMs: number
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now();

  let entry = rateLimitStore.get(userId);

  if (!entry) {
    entry = { timestamps: [] };
    rateLimitStore.set(userId, entry);
  }

  // Remove expired timestamps
  entry.timestamps = cleanExpiredEntries(entry, windowMs);

  if (entry.timestamps.length >= maxRequests) {
    const oldestInWindow = entry.timestamps[0];
    const resetAt = oldestInWindow + windowMs;

    return {
      success: false,
      remaining: 0,
      resetAt,
    };
  }

  entry.timestamps.push(now);

  return {
    success: true,
    remaining: maxRequests - entry.timestamps.length,
    resetAt: now + windowMs,
  };
}

// Periodic cleanup to prevent memory leaks
const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (
      entry.timestamps.length === 0 ||
      entry.timestamps.every((ts) => now - ts > CLEANUP_INTERVAL)
    ) {
      rateLimitStore.delete(key);
    }
  }
}, CLEANUP_INTERVAL).unref?.();
