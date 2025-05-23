// File: lib/alerts/anomalyDetector.js

/**
 * Flags anomalies when vitals deviate >20% from recent average.
 */
const windowSize = 10;
const history = [];

export function detectAnomaly(vital) {
  history.push(vital);
  if (history.length > windowSize) history.shift();

  const avgHR   = history.reduce((sum, v) => sum + v.heartRate, 0) / history.length;
  const avgTemp = history.reduce((sum, v) => sum + v.temperature, 0)   / history.length;

  const hrDev   = Math.abs(vital.heartRate - avgHR) / avgHR;
  const tempDev = Math.abs(vital.temperature - avgTemp) / avgTemp;

  if (hrDev > 0.2 || tempDev > 0.2) {
    return {
      anomaly: true,
      message: 'Unusual vitals detected—please verify sensor data.',
    };                                                         // Threshold-based detection :contentReference[oaicite:11]{index=11}
  }
  return { anomaly: false };
}