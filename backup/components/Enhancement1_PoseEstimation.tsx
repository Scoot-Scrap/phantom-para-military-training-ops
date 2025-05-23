// components/Enhancement1_PoseEstimation.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-wasm';
import * as posenet from '@tensorflow-models/posenet';

export default function PoseEstimation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [net, setNet] = useState<posenet.PoseNet>();

  useEffect(() => {
    async function setup() {
      // Set WASM backend for max performance
      await tf.setBackend('wasm');
      const model = await posenet.load({ architecture: 'MobileNetV1', outputStride: 16, inputResolution: { width: 640, height: 480 }, multiplier: 0.75 });
      setNet(model);

      if (navigator.mediaDevices.getUserMedia && videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        detectPose();
      }
    }
    setup();

    async function detectPose() {
      if (!net || !videoRef.current) return;
      const pose = await net.estimateSinglePose(videoRef.current, { flipHorizontal: false });
      console.log(pose);
      requestAnimationFrame(detectPose);
    }
  }, [net]);

  return <video ref={videoRef} width="640" height="480" style={{ transform: 'scaleX(-1)' }} />;
}
2. Full‑Body Tracking with MediaPipe Holistic
tsx
Copy
Edit
// components/Enhancement2_Holistic.tsx
import React, { useEffect, useRef } from 'react';
import { Holistic } from '@mediapipe/holistic';
import { Camera } from '@mediapipe/camera_utils';

export default function HolisticTracking() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const holistic = new Holistic({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`
    });
    holistic.setOptions({ modelComplexity: 1, smoothLandmarks: true, enableSegmentation: true });
    holistic.onResults((results) => {
      const ctx = canvasRef.current!.getContext('2d')!;
      ctx.save();
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      ctx.drawImage(results.image, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
      // draw landmarks...
      ctx.restore();
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => await holistic.send({ image: videoRef.current! }),
      width: 640,
      height: 480
    });
    camera.start();
  }, []);

  return (
    <div>
      <video ref={videoRef} width="640" height="480" style={{ display: 'none' }} />
      <canvas ref={canvasRef} width="640" height="480" />
    </div>
  );
}