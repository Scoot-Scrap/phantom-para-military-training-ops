// services/aiModel.ts
import * as tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";

let recognizer: speechCommands.SpeechCommandRecognizer | null = null;

// Initialize once
export async function initModel() {
  if (recognizer) return;
  recognizer = speechCommands.create("BROWSER_FFT");
  await recognizer.ensureModelLoaded();
}

// Classify a single 1D audio feature vector
export async function classifyAction(
  audioFeatures: Float32Array
): Promise<string> {
  await initModel();
  const input = tf.tensor([audioFeatures]);
  const { scores } = await recognizer!.recognize(input);
  const top = scores.indexOf(Math.max(...scores));
  return recognizer!.wordLabels()[top];
}

// Incremental fine-tuning (personalization)
// Call this when user confirms a label (e.g., “That rep was a perfect punch”)
export async function fineTune(
  audioFeatures: Float32Array,
  label: string
) {
  // NOTE: speech-commands model only exposes transfer learning in TF.js 3.x+
  const transfer = recognizer!.createTransfer("personal_"+label);
  await transfer.load();
  const xs = tf.tensor([audioFeatures]);
  const ys = tf.oneHot(tf.tensor1d([recognizer!.wordLabels().indexOf(label)], "int32"), recognizer!.wordLabels().length);
  await transfer.train({ epochs: 3, batchSize: 1, xTrain: xs, yTrain: ys });
  await transfer.save();