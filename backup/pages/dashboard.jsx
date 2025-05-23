// pages/dashboard.tsx
import { BiometricProvider, useBiometrics } from '../context/BiometricContext';

function DashboardContent() {
  const { normalized, metrics } = useBiometrics();
  return (
    <div className="container mx-auto p-4">
      <h2>Vitals</h2>
      <pre>{JSON.stringify(normalized, null, 2)}</pre>
      <h2>Metrics</h2>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <BiometricProvider>
      <DashboardContent />
    </BiometricProvider>
  );
}