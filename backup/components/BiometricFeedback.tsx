// components/BiometricFeedback.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  loadModels,
  setupCamera,
  estimatePose,
  onFaceResults,
} from "@/lib/sensors";
import { computeMetrics } from "@/services/aiMetrics";
import PerformanceChart from "./PerformanceChart";

export default function BiometricFeedback() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [metricsHistory, setMetricsHistory] = useState<number[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState({
    reactionTime: 0,
    formAccuracy: 0,
    calmnessScore: 0,
  });

  useEffect(() => {
    let faceData: any = null;
    let animationId: number;

    async function init() {
      await loadModels();
      if (!videoRef.current) return;
      await setupCamera(videoRef.current);

      onFaceResults((results) => {
        faceData = results;
      });

      async function frameLoop() {
        if (videoRef.current) {
          const pose = await estimatePose(videoRef.current);
          const timestamp = performance.now();
          const metrics = computeMetrics({ pose, face: faceData, timestamp });
          setCurrentMetrics(metrics);
          setMetricsHistory((h) => [...h.slice(-99), metrics.formAccuracy]);
        }
        animationId = requestAnimationFrame(frameLoop);
      }
      frameLoop();
    }

    init();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div style={{ padding: "1rem", backgroundColor: "#222", color: "#e0e0e0" }}>
      <h2>Biometric Feedback</h2>
      <video ref={videoRef} style={{ display: "none" }} />
      <p>Reaction Time: {currentMetrics.reactionTime.toFixed(0)} ms</p>
      <p>Form Accuracy: {currentMetrics.formAccuracy.toFixed(1)} %</p>
      <p>Calmness Score: {currentMetrics.calmnessScore.toFixed(1)} %</p>
      <PerformanceChart label="Form Accuracy Over Time" data={metricsHistory} />
    </div>
  );
}
