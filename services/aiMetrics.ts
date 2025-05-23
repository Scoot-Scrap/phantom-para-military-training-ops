// services/aiMetrics.ts
export interface MetricsInput {
  pose: any;
  face: any;
  timestamp: number;
}

export interface MetricsOutput {
  reactionTime: number; // ms
  formAccuracy: number; // 0–100%
  calmnessScore: number; // 0–100%
  // ... add other metrics here
}

/**
 * A very basic example of computing metrics.
 * You can replace with a call to your own AI service.
 */
export function computeMetrics(input: MetricsInput): MetricsOutput {
  // Dummy implementations:
  const reactionTime = Math.random() * 200 + 100;
  const formAccuracy = Math.random() * 50 + 50;
  const calmnessScore = Math.random() * 50 + 50;

  return { reactionTime, formAccuracy, calmnessScore };
}
