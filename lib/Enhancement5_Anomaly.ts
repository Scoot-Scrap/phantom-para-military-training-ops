// lib/Enhancement5_Anomaly.ts
import * as tf from "@tensorflow/tfjs";

let lstmModel: tf.LayersModel;

export async function loadAnomalyModel() {
  lstmModel = await tf.loadLayersModel("/models/lstm-drifts/model.json");
}

export async function detectAnomaly(sequence: number[][]) {
  // sequence: [timesteps, features]
  const input = tf.tensor([sequence]);
  const prediction = lstmModel.predict(input) as tf.Tensor;
  const score = (await prediction.data())[0];
  return score > 0.5; // true = anomaly
}
