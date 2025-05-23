import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function PerformanceChart({ data }) {
  const canvasRef = useRef();

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((_, i) => `T${i + 1}`),
        datasets: [
          {
            label: "Heart Rate",
            data: data,
            tension: 0.4,
          },
        ],
      },
      options: { scales: { y: { beginAtZero: true } } },
    });
  }, [data]);

  return <canvas ref={canvasRef} />;
}
