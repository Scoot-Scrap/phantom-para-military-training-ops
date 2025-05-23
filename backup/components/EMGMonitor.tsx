'use client';
import React, { useState, useEffect } from 'react';

export default function EMGMonitor() {
  const [emg, setEmg] = useState(0);

  useEffect(() => {
    async function connectEMG() {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['emg_service_uuid'] }]
      });
      const server = await device.gatt!.connect();
      const service = await server.getPrimaryService('emg_service_uuid');
      const char = await service.getCharacteristic('emg_char_uuid');
      await char.startNotifications();
      char.addEventListener('characteristicvaluechanged', (e: any) => {
        setEmg(e.target.value.getUint8(0));
      });
    }
    connectEMG();
  }, []);

  return <div>EMG Level: {emg}</div>;
}