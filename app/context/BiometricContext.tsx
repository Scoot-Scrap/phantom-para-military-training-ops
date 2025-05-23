// /app/context/BiometricContext.tsx

'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';

// 1. Define shape of vitals
export interface Vitals {
  timestamp: string;
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  oxygenSaturation: number;
  respiratoryRate: number;
  skinTemperature: string;
}

// 2. Context value interface
interface BiometricContextProps {
  vitals: Vitals | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
  updateVitals: (newVitals: Omit<Vitals, 'timestamp'>) => Promise<void>;
}

// 3. Create context with defaults
const BiometricContext = createContext<BiometricContextProps>({
  vitals: null,
  loading: true,
  error: null,
  retry: () => {},
  updateVitals: async () => {},
});

// 4. Provider implementation
export function BiometricProvider({ children }: { children: ReactNode }) {
  const [vitals, setVitals] = useState<Vitals | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  // Fetch with retry
  const fetchVitals = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/biometric/sampleVitals');
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data: Vitals = await res.json();
      setVitals(data);
    } catch (err: any) {
      setError(err.message);
      if (attempt < 2) setTimeout(() => setAttempt(a => a + 1), 1000);
    } finally {
      setLoading(false);
    }
  };

  // Optimistic update for POST
  const updateVitals = async (newVitals: Omit<Vitals, 'timestamp'>) => {
    if (!vitals) return;
    const previous = vitals;
    setVitals({ timestamp: new Date().toISOString(), ...newVitals });

    try {
      const res = await fetch('/api/biometric/sampleVitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVitals),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const confirmed: Vitals = await res.json();
      setVitals(confirmed);
    } catch (err: any) {
      setError(err.message);
      setVitals(previous);
    }
  };

  // Trigger fetch on mount & retry
  useEffect(() => {
    fetchVitals();
  }, [attempt]);

  const retry = () => setAttempt(a => a + 1);

  return (
    <BiometricContext.Provider value={{ vitals, loading, error, retry, updateVitals }}>
      {children}
    </BiometricContext.Provider>
  );
}

// 5. Hook for consuming context
export const useBiometric = () => useContext(BiometricContext);