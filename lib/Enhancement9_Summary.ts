// lib/Enhancement9_Summary.ts
import axios from "axios";

export async function generateSummary(metrics: Record<string, any>) {
  const prompt = `Summarize performance:\n${JSON.stringify(metrics, null, 2)}`;
  const res = await axios.post("/api/ai/summary", { prompt });
  return res.data.text as string;
}
