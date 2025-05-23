import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export default function AnomalyDetector({ onAnomaly }) {
  const [model, setModel] = useState(null);
  const dataRef = useRef([]);

  useEffect(() => {
    async function loadModel() {
      const m = await tf.loadLayersModel(
        process.env.NEXT_PUBLIC_ANOMALY_MODEL_URL,
      );
      setModel(m);
    }
    loadModel();
  }, []);

  useEffect(() => {
    if (!model) return;
    const interval = setInterval(() => {
      // simulate incoming biometric sample
      const sample = Math.random();
      dataRef.current.push(sample);
      if (dataRef.current.length >= 30) {
        const input = tf.tensor([dataRef.current.slice(-30)]);
        const score = model.predict(input).dataSync()[0];
        if (score > parseFloat(process.env.NEXT_PUBLIC_ANOMALY_THRESHOLD)) {
          onAnomaly(score);
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [model, onAnomaly]);

  return null;
}
