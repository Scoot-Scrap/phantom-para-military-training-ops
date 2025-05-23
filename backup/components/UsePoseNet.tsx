import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

export interface PoseKeypoints {
  timestamp: number;
  keypoints: posenet.Keypoint[];
}

export function usePoseNet(videoRef: React.RefObject<HTMLVideoElement>) {
  const [poseData, setPoseData] = useState<PoseKeypoints | null>(null);
  const netRef = useRef<posenet.PoseNet>();

  useEffect(() => {
    async function loadModel() {
      netRef.current = await posenet.load({ architecture: 'MobileNetV1', outputStride: 16, inputResolution: { width: 640, height: 480 } });
    }
    loadModel();
  }, []);

  useEffect(() => {
    let anim: number;
    async function detectPose() {
      if (netRef.current && videoRef.current?.readyState === 4) {
        const pose = await netRef.current.estimateSinglePose(videoRef.current!, { flipHorizontal: false });
        setPoseData({ timestamp: Date.now(), keypoints: pose.keypoints });
      }
      anim = requestAnimationFrame(detectPose);
    }
    detectPose();
    return () => cancelAnimationFrame(anim);
  }, [videoRef]);

  return poseData;
}