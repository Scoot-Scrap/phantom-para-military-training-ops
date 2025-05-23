// services/biometric.ts
type SensorData = {
  accel: { x: number; y: number; z: number };
  gyro: { x: number; y: number; z: number };
  heartRate: number;
  audioFeatures: Float32Array;
};

export function startSensorWatch(onData: (data: SensorData) => Promise<void>) {
  // 1) Device motion (accelerometer + gyroscope)
  const motionHandler = (e: DeviceMotionEvent) => {
    const { acceleration, rotationRate } = e;
    if (!acceleration || !rotationRate) return;
    latest.accel = {
      x: acceleration.x || 0,
      y: acceleration.y || 0,
      z: acceleration.z || 0,
    };
    latest.gyro = {
      x: rotationRate.alpha || 0,
      y: rotationRate.beta || 0,
      z: rotationRate.gamma || 0,
    };
  };
  window.addEventListener("devicemotion", motionHandler, true);

  // 2) Heart rate via Web Bluetooth (nordic/Polar/etc.)
  let latestHR = 0;
  async function connectHRM() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["heart_rate"] }],
      });
      const server = await device.gatt!.connect();
      const svc = await server.getPrimaryService("heart_rate");
      const ch = await svc.getCharacteristic("heart_rate_measurement");
      await ch.startNotifications();
      ch.addEventListener("characteristicvaluechanged", (e) => {
        const data = (e.target as BluetoothRemoteGATTCharacteristic).value!;
        latestHR = data.getUint8(1);
      });
    } catch {
      latestHR = 0;
    }
  }
  connectHRM();

  // 3) Audio via Web Audio + FFT
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const src = audioCtx.createMediaStreamSource(stream);
    src.connect(analyser);
  });
  const freqData = new Float32Array(analyser.frequencyBinCount);

  // 4) Polling loop
  const latest: any = {
    accel: { x: 0, y: 0, z: 0 },
    gyro: { x: 0, y: 0, z: 0 },
  };
  const interval = setInterval(async () => {
    analyser.getFloatFrequencyData(freqData);
    const data: SensorData = {
      ...latest,
      heartRate: latestHR,
      audioFeatures: freqData.slice(0),
    };
    await onData(data);
  }, 200);

  return () => {
    clearInterval(interval);
    window.removeEventListener("devicemotion", motionHandler, true);
  };
}
