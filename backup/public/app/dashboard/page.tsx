// app/dashboard/page.tsx
export const runtime = "nodejs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromSession } from "@/lib/auth";
import LiveMission from "@/components/LiveMission";
import GamificationDashboard from "@/components/GamificationDashboard";
import AIGuidance from "@/components/AIGuidance";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) redirect("/login");
  const userData = getUserFromSession(sessionToken!);
  if (!userData) redirect("/login");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>
        Welcome, <strong>{userData.username}</strong>! (Role: {userData.role})
      </p>
      <form action="/api/logout" method="POST">
        <button type="submit">Logout</button>
      </form>
      <LiveMission />
      <GamificationDashboard />
      <AIGuidance />
    </div>
  );
}
