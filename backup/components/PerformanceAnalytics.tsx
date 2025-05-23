// components/PerformanceAnalytics.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

type Metrics = { reactionTime: number; formAccuracy: number; hrv: number };

export default function PerformanceAnalytics() {
  const [data, setData] = useState<Metrics[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await fetch("/api/analytics");
      const { metrics } = await res.json();
      setData((d) => [...d.slice(-49), metrics]);
    };
    const iv = setInterval(fetchMetrics, 1000);
    return () => clearInterval(iv);
  }, []);

  const chartData = {
    labels: data.map((_, i) => i.toString()),
    datasets: [
      {
        label: "Reaction Time (ms)",
        data: data.map((d) => d.reactionTime),
        fill: false,
      },
      {
        label: "Form Accuracy",
        data: data.map((d) => d.formAccuracy),
        fill: false,
      },
      { label: "HRV", data: data.map((d) => d.hrv), fill: false },
    ],
  };

  return (
    <div>
      <h2>Live Performance Metrics</h2>
      <Line data={chartData} />
    </div>
  );
}
