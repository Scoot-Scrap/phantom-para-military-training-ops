import { create } from "zustand";

interface SensorState {
  heartRate: number | null;
  keypoints: any[]; // from PoseNet
  reactionTime: number | null; // ms
  formAccuracy: number | null; // 0–100%
  calmness: number | null; // derived metric
  set: (partial: Partial<SensorState>) => void;
}

export const useSensorStore = create<SensorState>((set) => ({
  heartRate: null,
  keypoints: [],
  reactionTime: null,
  formAccuracy: null,
  calmness: null,
  set: (partial) => set(() => partial),
}));
