// lib/feedbackEngine.ts
import KalmanFilter from 'kalman-filter';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import { FaceMesh } from '@mediapipe/face_mesh';
import _ from 'lodash';

// 1) Sensor fusion & drift compensation (Kalman)
const kf = new KalmanFilter({ observation: 1, dynamic: 1 });
export function smoothSignal(raw: number[]) {
  return raw.map((v) => kf.filter({ observation: v }).state[0]);
}

// 2) Pose estimation for technique correctness
let poseNetModel: posenet.PoseNet;
export async function loadPoseNet() {
  if (!poseNetModel) {
    poseNetModel = await posenet.load();
  }
  return poseNetModel;
}
export async function estimatePose(image: HTMLVideoElement) {
  const model = await loadPoseNet();
  return model.estimateSinglePose(image, { flipHorizontal: false });
}

// 3) Ground Reaction Force estimation (placeholder stub)
export async function estimateGRF(imuData: number[][]): Promise<number[]> {
  // Adapted from UnderPressure/GRF-Estimation-IMU :contentReference[oaicite:0]{index=0}
  // Here you’d feed imuData into your trained model; stub returns zeros.
  return imuData.map(() => 0);
}

// 4) Fatigue & injury risk (simple moving‐avg of acceleration peaks)
export function computeFatigue(accels: number[]): number {
  const peaks = _.chain(accels).map(Math.abs).filter((v) => v > 1.5).value();
  return peaks.length / accels.length;
}

// 5) Face‐mesh for stress / focus (e.g. eye‐blink rate)
const faceMesh = new FaceMesh({ locateFile: (f) => f });
export async function loadFaceMesh() {
  await faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true });
  return faceMesh;
}
export async function estimateBlinkRate(video: HTMLVideoElement): Promise<number> {
  const fm = await loadFaceMesh();
  return new Promise((resolve) => {
    fm.onResults((results) => {
      // count eye‐landmark distance changes...
      resolve(0);
    });
    fm.send({ image: video });
  });
}

// 6) Unified entrypoint
export async function processFrame(frame: HTMLVideoElement, imu: number[][]) {
  const [pose, grf, fatigue, blink] = await Promise.all([
    estimatePose(frame),
    estimateGRF(imu),
    Promise.resolve(computeFatigue(_.flatMap(imu))),
    estimateBlinkRate(frame),
  ]);
  return {
    jointAngles: pose.keypoints.map((kp) => ({ part: kp.part, angle: kp.position })),
    grf,
    fatigue,
    blinkRate: blink,
  };
}