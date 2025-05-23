// components/WearableDataStream.tsx
"use client";
import React, { useEffect } from "react";
import io from "socket.io-client";
import { KalmanFilter } from "kalman-filter";

let socket: SocketIOClient.Socket;
const kf = new KalmanFilter({ R: 0.01, Q: 3 });

export default function WearableDataStream() {
  useEffect(() => {
    socket = io(); // assumes same origin socket-server.js
    socket.on("wearable:data", (raw: any) => {
      // raw: { timestamp, heartRate, accel: {x,y,z}, gyro: {x,y,z}, skinTemp }
      const filteredAccel = {
        x: kf.filter(raw.accel.x),
        y: kf.filter(raw.accel.y),
        z: kf.filter(raw.accel.z),
      };
      // send into performance engine
      window.dispatchEvent(
        new CustomEvent("sensor:update", {
          detail: { ...raw, accel: filteredAccel },
        }),
      );
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return <div id="wearable-stream">Streaming wearable data...</div>;
}
