// pages/admin.jsx

import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Line } from "react-chartjs-2";

export default function Admin() {
  const { data: session, status } = useSession();
  const [sessions, setSessions] = useState([]);

  // Fetch the last 50 session records once signed in
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/sessions")
        .then((res) => res.json())
        .then((json) => setSessions(json.sessions || []))
        .catch(console.error);
    }
  }, [status]);

  // Not signed in → show a sign-in prompt
  if (status !== "authenticated") {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>Please sign in to view analytics</h2>
        <button
          onClick={() => signIn()}
          style={{ padding: "8px 16px", fontSize: 16 }}
        >
          Sign In
        </button>
      </div>
    );
  }

  // Prepare chart data
  const times = sessions.map((s) =>
    new Date(s.created_at).toLocaleTimeString(),
  );
  const hrData = sessions.map((s) => s.heartRate);
  const oxData = sessions.map((s) => s.oxygen);

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1>Admin Analytics</h1>

      <div style={{ height: 300 }}>
        <Line
          data={{
            labels: [...times].reverse(),
            datasets: [
              {
                label: "Heart Rate (bpm)",
                data: [...hrData].reverse(),
                tension: 0.4,
              },
              {
                label: "Oxygen (%)",
                data: [...oxData].reverse(),
                tension: 0.4,
              },
            ],
          }}
          options={{
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { position: "bottom" } },
          }}
        />
      </div>

      <table
        style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>When</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>HR</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>O₂</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>
              Anom.
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>
              Recovery
            </th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s.id}>
              <td style={{ padding: 8 }}>
                {new Date(s.created_at).toLocaleString()}
              </td>
              <td style={{ padding: 8 }}>{s.heartRate}</td>
              <td style={{ padding: 8 }}>{s.oxygen}</td>
              <td style={{ padding: 8 }}>{s.anomalies}</td>
              <td style={{ padding: 8 }}>{s.recovery}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
