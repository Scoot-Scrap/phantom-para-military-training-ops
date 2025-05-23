// src/pages/dashboard.tsx
import { useBiometrics } from '../context/BiometricContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Dashboard() {
  const { normalized, metrics, loading, error } = useBiometrics();

  if (loading) return <Spinner />;                                                  // Show spinner during load :contentReference[oaicite:4]{index=4}
  if (error) return <ErrorMessage message={error} retry={() => window.location.reload()} />; // Display error + retry :contentReference[oaicite:5]{index=5}

  return (
    <div>
      <h2>Vitals</h2>
      <pre>{JSON.stringify(normalized, null, 2)}</pre>
      <h2>Metrics</h2>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
}