// lib/Enhancement3_HeartRate.ts
export async function connectHeartRate() {
  // Heart Rate Service UUID
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ services: ["heart_rate"] }],
  });
  const server = await device.gatt!.connect();
  const service = await server.getPrimaryService("heart_rate");
  const characteristic = await service.getCharacteristic(
    "heart_rate_measurement",
  );

  await characteristic.startNotifications();
  characteristic.addEventListener("characteristicvaluechanged", (evt) => {
    const data = evt.target as BluetoothRemoteGATTCharacteristic;
    const value = data.value!;
    // parse first two bytes for heart rate...
    const heartRate = value.getUint8(1);
    console.log("HR:", heartRate);
  });
}
