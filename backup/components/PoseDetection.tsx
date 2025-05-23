// components/PoseDetection.tsx
"use client";
import React, { useRef, useEffect, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import "@tensorflow/tfjs";

export default function PoseDetection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [poseScore, setPoseScore] = useState<number>(0);

  useEffect(() => {
    async function setup() {
      if (!videoRef.current) return;
      const video = videoRef.current;
      video.width = 640;
      video.height = 480;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      await video.play();

      const net = await posenet.load();
      detectPose(net);
    }

    async function detectPose(net: posenet.PoseNet) {
      if (!videoRef.current) return;
      const pose = await net.estimateSinglePose(videoRef.current, {
        flipHorizontal: false,
      });
      setPoseScore(pose.score);
      requestAnimationFrame(() => detectPose(net));
    }

    setup();
  }, []);

  return (
    <div>
      <h3>Pose Estimation Score:</h3>
      <p>{(poseScore * 100).toFixed(1)}%</p>
      <video ref={videoRef} style={{ display: "none" }} />
    </div>
  );
}
