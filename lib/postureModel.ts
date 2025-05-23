// lib/postureModel.ts
import * as tf from '@tensorflow/tfjs';

let model: tf.LayersModel;

export async function loadPostureModel() {
  if (!model) {
    model = await tf.loadLayersModel('/models/posture_lstm/model.json');
  }
  return model;
}

/**
 * sequence: Array of [x,y,z,…] keypoint feature vectors over time
 * Returns a risk score [0…1]
 */
export async function assessPostureRisk(sequence: number[][]) {
  const input = tf.tensor(sequence).expandDims(0);           // [1, time, features]
  const prediction = model.predict(input) as tf.Tensor;
  const riskScore = (await prediction.data())[0];
  tf.dispose([input, prediction]);
  return riskScore;
}