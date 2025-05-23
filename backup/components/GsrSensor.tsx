// components/GsrSensor.tsx
"use client";
import { useEffect, useState } from "react";
import { KalmanFilter } from "@/lib/kalman";

const kalman = new KalmanFilter({ R: 0.01, Q: 3 });

export default function GsrSensor() {
  const [reading, setReading] = useState<number | null>(null);

  useEffect(() => {
    let device: USBDevice;

    async function connect() {
      device = await navigator.usb.requestDevice({
        filters: [{ vendorId: 0x2341 }], // adjust to your sensor’s VID
      });
      await device.open();
      await device.selectConfiguration(1);
      await device.claimInterface(0);
      readLoop();
    }

    async function readLoop() {
      while (device.opened) {
        const result = await device.transferIn(1, 2);
        const raw = result.data?.getUint16(0, true) ?? 0;
        const smooth = kalman.filter(raw);
        setReading(smooth);
      }
    }

    connect().catch(console.error);
  }, []);

  return (
    <div>
      <h3>GSR (Skin Conductance):</h3>
      <p>{reading !== null ? reading.toFixed(2) : "Connecting..."}</p>
    </div>
  );
}
