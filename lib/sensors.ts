// lib/sensors.ts
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import { FaceMesh } from "@mediapipe/face_mesh";

let net: posenet.PoseNet | null = null;
let faceMesh: FaceMesh | null = null;

export async function loadModels() {
  if (!net) {
    net = await posenet.load();
  }
  if (!faceMesh) {
    faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });
    await faceMesh.setOptions({ refineLandmarks: true });
  }
}

export async function estimatePose(video: HTMLVideoElement) {
  if (!net) throw new Error("PoseNet not loaded");
  return net.estimateSinglePose(video, {
    flipHorizontal: false,
  });
}

export function onFaceResults(callback: (results: any) => void) {
  if (!faceMesh) throw new Error("FaceMesh not loaded");
  faceMesh.onResults(callback);
}

// Helper to start camera
export async function setupCamera(video: HTMLVideoElement) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: "environment" },
  });
  video.srcObject = stream;
  await new Promise((res) => (video.onloadedmetadata = res));
  video.play();
}
