// components/RealTimeMetrics.tsx
"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

interface Metric {
  name: string;
  value: number;
  timestamp: number;
}

// Connect once; reuse across renders
const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000",
);

export default function RealTimeMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    socket.on("metric", (data: Metric) => {
      setMetrics((prev) => [data, ...prev].slice(0, 50)); // keep last 50
    });
    return () => {
      socket.off("metric");
    };
  }, []);

  return (
    <div>
      <h2>📈 Live Metrics</h2>
      <ul>
        {metrics.map((m, i) => (
          <li key={i}>
            <strong>{m.name}:</strong> {m.value.toFixed(2)} @{" "}
            {new Date(m.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
