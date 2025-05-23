// app/api/logout/route.ts
export const runtime = "nodejs";

import { destroySession } from "@/lib/auth";
import { serialize } from "cookie";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (token) destroySession(token);
  const cookieStr = serialize("session", "", {
    maxAge: 0,
    path: "/",
  });
  return new Response(null, {
    status: 302,
    headers: {
      "Set-Cookie": cookieStr,
      Location: "/login",
    },
  });
}
