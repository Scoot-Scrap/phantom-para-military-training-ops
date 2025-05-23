'use client';
import React, { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

let correctorModel: tf.LayersModel;

/**
 * Props:
 *   initialKeypoints: number[][]  – raw pose keypoints
 *   onCorrected: (kp: number[][]) => void
 */
export default function PoseCorrector({ initialKeypoints, onCorrected }) {
  useEffect(() => {
    async function loadAndRun() {
      if (!correctorModel) {
        correctorModel = await tf.loadLayersModel('/models/pose_corrector/model.json');
      }
      const input = tf.tensor(initialKeypoints).expandDims(0);
      const output = (correctorModel.predict(input) as tf.Tensor)
        .squeeze()
        .arraySync() as number[][];
      onCorrected(output);
      tf.dispose([input, output]);
    }
    loadAndRun();
  }, [initialKeypoints, onCorrected]);

  return null;
}