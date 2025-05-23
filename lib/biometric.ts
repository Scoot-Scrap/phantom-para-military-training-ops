// lib/biometric.ts
import create from "zustand";

export interface BiometricState {
  heartRate: number;
  stressLevel: number;
  updateSensor: (data: Partial<BiometricState>) => void;
}

export const useBiometricData = create<BiometricState>((set) => ({
  heartRate: 0,
  stressLevel: 0,
  updateSensor: (data) => set(data),
}));
