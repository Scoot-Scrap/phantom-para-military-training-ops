import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function EmotionDetector({ onEmotion }) {
  const videoRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => setModelsLoaded(true));
  }, []);

  useEffect(() => {
    if (!modelsLoaded) return;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(console.error);

    const interval = setInterval(async () => {
      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions(),
        )
        .withFaceExpressions();
      if (detections) {
        const { expressions } = detections;
        const top = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0];
        onEmotion(top[0]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [modelsLoaded, onEmotion]);

  return <video ref={videoRef} autoPlay muted width={200} />;
}
