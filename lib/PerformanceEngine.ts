// lib/PerformanceEngine.ts
import * as posenet from "@tensorflow-models/posenet";

type SensorData = {
  timestamp: number;
  heartRate: number;
  accel: { x: number; y: number; z: number };
  gyro: { x: number; y: number; z: number };
  skinTemp: number;
  pose?: posenet.Pose;
};

const history: SensorData[] = [];

// Capture pose every frame
export async function capturePose(videoElement: HTMLVideoElement) {
  const net = await posenet.load();
  setInterval(async () => {
    const pose = await net.estimateSinglePose(videoElement, {
      flipHorizontal: false,
    });
    const ts = Date.now();
    history.push({
      timestamp: ts,
      heartRate: 0,
      accel: { x: 0, y: 0, z: 0 },
      gyro: { x: 0, y: 0, z: 0 },
      skinTemp: 0,
      pose,
    });
    // prune old
    if (history.length > 500) history.shift();
  }, 100);
}

// Compute metrics on demand
export function computeMetrics() {
  const latest = history.slice(-2);
  const [prev, curr] = latest;
  const reactionTime = curr.timestamp - prev.timestamp;
  // form accuracy: average keypoint confidence
  const acc =
    curr.pose?.keypoints.reduce((sum, kp) => sum + kp.score, 0)! /
    (curr.pose?.keypoints.length || 1);
  // heart-rate variability
  const hrvs =
    history.map((d) => d.heartRate).reduce((a, b) => a + b, 0) /
      history.length || 0;
  return { reactionTime, formAccuracy: acc, hrv: hrvs };
}
