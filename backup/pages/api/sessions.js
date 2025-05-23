import { supabase } from "../../lib/supabaseClient";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: "Unauthenticated" });

  if (req.method === "POST") {
    const { data, heartRate, oxygen, anomalies, recovery } = req.body;
    const { error } = await supabase.from("sessions").insert([
      {
        user_id: session.user.id,
        data,
        heartRate,
        oxygen,
        anomalies,
        recovery,
      },
    ]);
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ sessions: data });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end();
}
