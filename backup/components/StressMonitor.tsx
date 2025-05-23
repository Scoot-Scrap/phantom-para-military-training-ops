'use client';
import React, { useState, useEffect } from 'react';

export default function StressMonitor() {
  const [hr, setHr] = useState(0);
  const [gsr, setGsr] = useState(0);

  useEffect(() => {
    async function connectHR() {
      const dev = await navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] });
      const srv = await dev.gatt!.connect();
      const svc = await srv.getPrimaryService('heart_rate');
      const ch = await svc.getCharacteristic('heart_rate_measurement');
      await ch.startNotifications();
      ch.addEventListener('characteristicvaluechanged', (e: any) => {
        setHr(e.target.value.getUint8(1));
      });
    }
    async function connectGSR() {
      const dev = await navigator.bluetooth.requestDevice({ filters: [{ services: ['gsr_service_uuid'] }] });
      const srv = await dev.gatt!.connect();
      const svc = await srv.getPrimaryService('gsr_service_uuid');
      const ch = await svc.getCharacteristic('gsr_char_uuid');
      await ch.startNotifications();
      ch.addEventListener('characteristicvaluechanged', (e: any) => {
        setGsr(e.target.value.getUint16(0, true));
      });
    }
    connectHR();
    connectGSR();
  }, []);

  return (
    <div>
      <p>Heart Rate: {hr} bpm</p>
      <p>GSR: {gsr} µS</p>
    </div>
  );
}