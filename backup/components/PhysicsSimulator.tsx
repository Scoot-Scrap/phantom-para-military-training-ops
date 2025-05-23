'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';

/**
 * Props:
 *   mesh: THREE.Mesh  – your user‑avatar mesh from three.js
 */
export default function PhysicsSimulator({ mesh }) {
  return (
    <Canvas style={{ height: 300 }}>
      <ambientLight />
      <Physics gravity={[0, -9.81, 0]}>
        <RigidBody type="fixed">
          <primitive object={mesh} />
        </RigidBody>
      </Physics>
    </Canvas>
  );
}