// context/BiometricContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { normalizeVitals, computeMetrics } from '../utils/biometricUtils';

interface BiometricDataPoint { /* define fields matching sampleVitals.json */ }
interface BiometricContextValue {
  normalized: ReturnType<typeof normalizeVitals>;
  metrics: ReturnType<typeof computeMetrics>;
}

const BiometricContext = createContext<BiometricContextValue | undefined>(undefined);

export function BiometricProvider({ children }: { children: React.ReactNode }) {
  const [normalized, setNormalized] = useState<BiometricContextValue['normalized']>([]);
  const [metrics, setMetrics] = useState<BiometricContextValue['metrics']>({});

  useEffect(() => {
    fetch('/api/biometric/sampleVitals')
      .then(res => res.json())
      .then((data: BiometricDataPoint[]) => {
        const norm = normalizeVitals(data);
        setNormalized(norm);
        setMetrics(computeMetrics(norm));
      })
      .catch(err => {
        console.error('Failed to load biometric data:', err);
      });
  }, []);
  
  return (
    <BiometricContext.Provider value={{ normalized, metrics }}>
      {children}
    </BiometricContext.Provider>
  );
}

export function useBiometrics(): BiometricContextValue {
  const ctx = useContext(BiometricContext);
  if (!ctx) throw new Error('useBiometrics must be used within BiometricProvider');
  return ctx;
}