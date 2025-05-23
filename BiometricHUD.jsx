// app/biometrics/components/BiometricHUD.jsx

import useBiometrics from "../hooks/useBiometrics";

export default function BiometricHUD() {
  const vitals = useBiometrics();

  return (
    <div style={{ color: "#0f0", fontFamily: "monospace", padding: 10 }}>
      <h2>Biometric Feedback HUD</h2>
      <ul>
        {Object.entries(vitals).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
