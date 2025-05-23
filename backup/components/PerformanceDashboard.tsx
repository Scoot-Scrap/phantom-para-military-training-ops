// components/PerformanceDashboard.tsx
"use client";

import { useEffect } from "react";
import io from "socket.io-client";

// Initialize socket once
const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000",
);

interface Metric {
  name: string;
  value: number;
  timestamp: number;
}

export default function PerformanceDashboard() {
  useEffect(() => {
    // Example: emit a heartbeat metric every second
    const interval = setInterval(() => {
      const metric: Metric = {
        name: "reactionTime",
        value: Math.random() * 500, // replace with real measurement
        timestamp: Date.now(),
      };
      socket.emit("metric", metric);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>📊 Performance Dashboard</h2>
      <p>Emitting metrics to the server…</p>
    </div>
  );
}
