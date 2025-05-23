import { NextResponse } from "next/server";

export function middleware(req) {
  const segment = req.cookies.get("x-user-segment")?.value || "default";
  const res = NextResponse.next();
  res.headers.set("x-edge-segment", segment);
  return res;
}

export const config = {
  matcher: "/",
};
