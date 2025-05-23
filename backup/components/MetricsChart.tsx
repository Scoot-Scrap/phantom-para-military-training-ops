// components/MetricsChart.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
);

export default function MetricsChart({ socket }: { socket: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart>();

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d")!;
    const c = new Chart(ctx, {
      type: "line",
      data: { labels: [], datasets: [] },
      options: {
        animation: false,
        scales: {
          x: { title: { display: true, text: "Time" } },
          y: { title: { display: true, text: "Value" } },
        },
      },
    });
    setChart(c);

    socket.on("metrics-update", ({ filtered }) => {
      const time = new Date().toLocaleTimeString();
      Object.entries(filtered).forEach(([key, val], idx) => {
        let ds = c.data.datasets!.find((d) => d.label === key);
        if (!ds) {
          ds = { label: key, data: [], borderWidth: 1, tension: 0.3 };
          c.data.datasets!.push(ds);
        }
        ds.data.push({ x: time, y: val });
        if (ds.data.length > 20) ds.data.shift();
      });
      if (c.data.labels!.length > 20) c.data.labels!.shift();
      c.data.labels!.push(time);
      c.update("none");
    });

    return () => socket.off("metrics-update");
  }, [socket]);

  return <canvas ref={canvasRef} />;
}
