import { useState, useEffect } from 'react';

export interface SensorReading {
  timestamp: number;
  heartRate?: number;
  bodyTemp?: number;
  spo2?: number;
}

export function useBluetoothSensor(): {
  reading: SensorReading | null;
  connect: () => Promise<void>;
  disconnect: () => void;
} {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [server, setServer] = useState<BluetoothRemoteGATTServer | null>(null);
  const [reading, setReading] = useState<SensorReading | null>(null);

  // UUIDs for standard GATT services/characteristics
  const HR_SERVICE = 'heart_rate';
  const HR_CHAR = 'heart_rate_measurement';
  const TEMP_SERVICE = 'health_thermometer';
  const TEMP_CHAR = 'temperature_measurement';
  const SPO2_SERVICE = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'; // replace with real UUID
  const SPO2_CHAR    = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

  async function connect() {
    try {
      const dev = await navigator.bluetooth.requestDevice({
        filters: [{ services: [HR_SERVICE, TEMP_SERVICE, SPO2_SERVICE] }]
      });
      setDevice(dev);
      const srv = await dev.gatt!.connect();
      setServer(srv);

      // Setup Heart Rate notifications
      const hrSvc = await srv.getPrimaryService(HR_SERVICE);
      const hrChar = await hrSvc.getCharacteristic(HR_CHAR);
      await hrChar.startNotifications();
      hrChar.addEventListener('characteristicvaluechanged', e => {
        const value = (e.target as BluetoothRemoteGATTCharacteristic)
                        .value!.getUint8(1);
        setReading(r => ({
          ...r!,
          timestamp: Date.now(),
          heartRate: value
        }));
      });

      // Temperature notifications
      const tmpSvc = await srv.getPrimaryService(TEMP_SERVICE);
      const tmpChar = await tmpSvc.getCharacteristic(TEMP_CHAR);
      await tmpChar.startNotifications();
      tmpChar.addEventListener('characteristicvaluechanged', e => {
        const tempRaw = (e.target as BluetoothRemoteGATTCharacteristic)
                          .value!.getFloat32(1, /*littleEndian=*/true);
        setReading(r => ({
          ...r!,
          timestamp: Date.now(),
          bodyTemp: tempRaw
        }));
      });

      // SPO₂ notifications (if available)
      try {
        const spoSvc = await srv.getPrimaryService(SPO2_SERVICE);
        const spoChar = await spoSvc.getCharacteristic(SPO2_CHAR);
        await spoChar.startNotifications();
        spoChar.addEventListener('characteristicvaluechanged', e => {
          const spo2Val = (e.target as BluetoothRemoteGATTCharacteristic)
                            .value!.getUint8(1);
          setReading(r => ({
            ...r!,
            timestamp: Date.now(),
            spo2: spo2Val
          }));
        });
      } catch {/* not all devices support SpO₂ */}

      // initialize reading
      setReading({ timestamp: Date.now() });
    } catch (err) {
      console.error('Bluetooth connect failed', err);
    }
  }

  function disconnect() {
    if (server?.connected) server.disconnect();
    setDevice(null);
    setServer(null);
    setReading(null);
  }

  return { reading, connect, disconnect };
}