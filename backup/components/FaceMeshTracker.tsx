// components/FaceMeshTracker.tsx
"use client";
import React, { useRef, useEffect, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import "@mediapipe/camera_utils";

export default function FaceMeshTracker() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [landmarks, setLandmarks] = useState<number[][]>([]);

  useEffect(() => {
    if (!videoRef.current) return;
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });
    faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true });
    faceMesh.onResults((results) => {
      setLandmarks(results.multiFaceLandmarks?.[0] ?? []);
    });

    const camera = new (window as any).Camera(videoRef.current, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });
    camera.start();
  }, []);

  return (
    <div>
      <h3>Facial Landmarks:</h3>
      <p>
        {landmarks.length ? `Detected ${landmarks.length} points` : "Loading…"}
      </p>
      <video ref={videoRef} style={{ display: "none" }} />
    </div>
  );
}
