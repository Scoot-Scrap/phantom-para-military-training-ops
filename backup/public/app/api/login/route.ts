// app/api/register/route.ts
export const runtime = "nodejs";

import { registerUser } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const result = await registerUser(username, password);
  if (result.error) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/register?error=1" },
    });
  }
  return new Response(null, {
    status: 302,
    headers: { Location: "/login?success=1" },
  });
}
