"use client";
import { useEffect, useState } from "react";
import { predictInjuryRisk } from "@/lib/injuryPredictor";

export default function InjuryPredictor() {
  const [risk, setRisk] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      // Example feature vector; replace with real sensor data
      const features = [0.7, 5.2, 6.5, 0.3, 1.2];
      const r = await predictInjuryRisk(features);
      setRisk(r);
    })();
  }, []);

  if (risk === null) return <p>Analyzing injury risk…</p>;
  return (
    <div
      style={{
        padding: "1rem",
        background: risk > 0.5 ? "#550000" : "#005500",
        color: "#fff",
      }}
    >
      <h3>Injury Risk</h3>
      <p>{(risk * 100).toFixed(1)}% chance of potential strain.</p>
    </div>
  );
}
