import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

export default function FailurePredictor({ inputs }) {
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    async function load() {
      const model = await tf.loadLayersModel(
        process.env.NEXT_PUBLIC_FAILURE_MODEL_URL,
      );
      const pred = model.predict(tf.tensor([inputs])).dataSync()[0];
      setRisk((pred * 100).toFixed(1));
    }
    load();
  }, [inputs]);

  if (risk === null) return <p>Assessing failure risk…</p>;
  return <p>Failure Risk: {risk}%</p>;
}
