// components/ScreeningAssessment.tsx
"use client";
import { useState, useEffect } from "react";
import { useBiometricData } from "@/lib/biometric";
import MissionEngine from "./MissionEngine";

export default function ScreeningAssessment() {
  const bio = useBiometricData();
  const [stage, setStage] = useState<"rucks" | "nav" | "sere" | "cog">("rucks");

  const nextStage = () => {
    setStage((s) =>
      s === "rucks"
        ? "nav"
        : s === "nav"
          ? "sere"
          : s === "sere"
            ? "cog"
            : "rucks",
    );
  };

  return (
    <div>
      <h2>Advanced Screening: {stage.toUpperCase()}</h2>
      <MissionEngine stage={stage} onComplete={nextStage} biometric={bio} />
      <div>
        <p>Heart Rate: {bio.heartRate} bpm</p>
        <p>Stress Index: {bio.stressLevel}</p>
      </div>
    </div>
  );
}
