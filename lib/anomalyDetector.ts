// lib/anomalyDetector.ts
import axios from "axios";

const AI_ENDPOINT = process.env.AI_ENDPOINT!;
const AI_KEY = process.env.AI_API_KEY!;
const THRESHOLD = parseFloat(process.env.ANOMALY_THRESHOLD || "0.8");

export async function detectAnomaly(
  metrics: Record<string, number>,
): Promise<boolean> {
  // 1) Simple rule-based: any metric > threshold
  for (const v of Object.values(metrics)) {
    if (Math.abs(v) > THRESHOLD) return true;
  }

  // 2) Call out to AI service for multi-variate anomaly detection
  try {
    const resp = await axios.post(
      AI_ENDPOINT,
      { metrics },
      { headers: { Authorization: `Bearer ${AI_KEY}` } },
    );
    return resp.data.anomalyScore > THRESHOLD;
  } catch (e) {
    console.warn("AI anomaly check failed:", e);
    return false;
  }
}
