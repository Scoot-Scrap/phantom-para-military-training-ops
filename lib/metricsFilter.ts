// lib/metricsFilter.ts
import KalmanFilter from "kalman-filter";

const kf = new KalmanFilter({ R: 0.01, Q: 3 });

export function smoothMetrics(raw: Record<string, number>) {
  // Apply Kalman filter per metric
  const smoothed: Record<string, number> = {};
  for (const key of Object.keys(raw)) {
    smoothed[key] = kf.filter({ data: raw[key] }).data;
  }

  // Then a simple 3-point moving average
  // (in-memory buffer for demo; in prod persist per-socket)
  (smoothMetrics as any).buffer = (smoothMetrics as any).buffer || [];
  const buf = (smoothMetrics as any).buffer;
  buf.push(smoothed);
  if (buf.length > 3) buf.shift();
  const avg: Record<string, number> = {};
  for (const key of Object.keys(smoothed)) {
    avg[key] =
      buf.reduce((sum: number, m: any) => sum + m[key], 0) / buf.length;
  }
  return avg;
}
