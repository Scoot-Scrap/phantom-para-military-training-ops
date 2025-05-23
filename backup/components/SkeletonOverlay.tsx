'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Line } from '@react-three/drei';

const bones: [number, number][] = [
  [0,1],[1,2],[2,3], /* … define all joint connections … */
];

export default function SkeletonOverlay({ keypoints }: { keypoints: { x:number,y:number,z:number }[] }) {
  return (
    <Canvas style={{ position:'absolute', top:0, left:0, pointerEvents:'none' }}>
      {bones.map(([i,j], idx) => (
        <Line
          key={idx}
          points={[
            [keypoints[i].x, keypoints[i].y, keypoints[i].z],
            [keypoints[j].x, keypoints[j].y, keypoints[j].z]
          ]}
          lineWidth={2}
          color="lime"
        />
      ))}
    </Canvas>
  );
}