"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function AIPerformanceDashboard() {
  const [insights, setInsights] = useState<string[]>([]);
  const [data, setData] = useState<{ labels: string[]; values: number[] }>({
    labels: [],
    values: [],
  });

  useEffect(() => {
    // Mock: fetch historical load data & AI tips
    setData({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      values: [70, 75, 68, 80, 72],
    });
    setInsights([
      "Great consistency this week!",
      "Consider lowering load intensity tomorrow.",
      "Your recovery score is low—prioritize sleep.",
    ]);
  }, []);

  return (
    <div
      style={{
        padding: "1rem",
        background: "#222",
        color: "#eee",
        marginTop: "1rem",
      }}
    >
      <h2>AI Performance Dashboard</h2>
      <Line
        data={{
          labels: data.labels,
          datasets: [
            {
              label: "Training Load",
              data: data.values,
              borderColor: "#4caf50",
            },
          ],
        }}
      />
      <section style={{ marginTop: "1rem" }}>
        <h3>Active Intelligence</h3>
        <ul>
          {insights.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
