// lib/injuryPredictor.ts
import * as tf from "@tensorflow/tfjs";

let model: tf.LayersModel | null = null;

export async function loadInjuryModel() {
  if (!model) {
    model = await tf.loadLayersModel("/models/injury-model/model.json");
  }
  return model;
}

export async function predictInjuryRisk(features: number[]): Promise<number> {
  const m = await loadInjuryModel();
  // features: [hrv, avgLoad, sleepHours, variability,…]
  const input = tf.tensor2d([features]);
  const score = (m.predict(input) as tf.Tensor).dataSync()[0];
  return score; // 0…1 risk probability
}
