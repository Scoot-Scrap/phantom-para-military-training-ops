import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface BiometricContextType {
  normalized: any;
  metrics: any;
  loading: boolean;
  error: boolean;
}

const BiometricContext = createContext<BiometricContextType>({
  normalized: null,
  metrics: null,
  loading: true,
  error: false,
});

export const BiometricProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [normalized, setNormalized] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/biometric/sampleVitals')
      .then((res) => res.json())
      .then((data) => {
        // TODO: replace with your actual normalization & metric logic
        setNormalized(data);
        setMetrics({ /* ...compute metrics from data... */ });
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <BiometricContext.Provider
      value={{ normalized, metrics, loading, error }}
    >
      {children}
    </BiometricContext.Provider>
  );
};

export const useBiometrics = () => useContext(BiometricContext);