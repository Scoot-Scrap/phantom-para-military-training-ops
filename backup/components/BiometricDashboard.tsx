// components/BiometricDashboard.tsx
"use client";
import { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

export default function BiometricDashboard() {
  const [data, setData] = useState<any>({});
  const chartRef = useRef<any>();

  useEffect(() => {
    const interval = setInterval(async () => {
      const resp = await axios.post('/api/feedback', {
        frameDataUrl: '', // capture current frame
        imu: []           // read current IMU array
      });
      setData(resp.data.metrics);
    }, 1000 / 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Live Biometric Metrics</h2>
      <Line
        ref={chartRef}
        data={{
          labels: data.grf?.map((_, i) => i) || [],
          datasets: [
            { label: 'GRF', data: data.grf, fill: false },
            { label: 'Fatigue', data: data.fatigue ? [data.fatigue] : [], fill: false }
          ]
        }}
      />
      <div>
        <p>Blink Rate: {data.blinkRate} / min</p>
        {data.guidance?.map((tip: string, i: number) => <p key={i}>💡 {tip}</p>)}
      </div>
    </div>
  );
}