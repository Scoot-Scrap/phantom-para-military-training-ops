// File: lib/middleware/rateLimit.ts

import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redisClient';                                      // Upstash Redis client :contentReference[oaicite:17]{index=17}

// 100 requests per 60s per IP
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '60 s'),
});

export async function rateLimit(req: NextRequest) {
  const ip = req.ip || 'unknown';
  const { success } = await ratelimit.limit(ip);
  if (!success) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
  return NextResponse.next();
}