import { useEffect, useState } from "react";

export default function BiometricOverlay() {
  const [vitals, setVitals] = useState({ heartRate: 0, stress: 0, fatigue: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/vitals")
        .then((res) => res.json())
        .then((data) => setVitals(data));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="biometric-overlay">
      <h3>Vitals</h3>
      <p>Heart Rate: {vitals.heartRate} bpm</p>
      <p>Stress: {vitals.stress}%</p>
      <p>Fatigue: {vitals.fatigue}%</p>
    </div>
  );
}
