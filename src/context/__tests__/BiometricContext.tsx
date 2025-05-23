import React, { createContext, useState, useEffect, useRef } from 'react';

export interface Vitals {
  heartRate: number;
  oxygen: number;
  temperature: number;
}

interface HistoryRecord extends Vitals {
  timestamp: string;
}

interface BiometricContextValue {
  vitals: Vitals | null;
  history: HistoryRecord[];
  paused: boolean;
  speed: number;
  theme: 'light' | 'dark';
  error: string | null;
  togglePause: () => void;
  setSpeed: (s: number) => void;
  exportHistory: () => void;
  toggleTheme: () => void;
}

export const BiometricContext = createContext<BiometricContextValue | undefined>(undefined);

export const BiometricProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [vitals, setVitals] = useState<Vitals | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeedState] = useState(1);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<number>();

  // Safe ranges for alerts
  const thresholds = {
    heartRate: { min: 50, max: 120 },
    oxygen:    { min: 90, max: 100 },
    temperature: { min: 36, max: 37.5 }
  };

  useEffect(() => {
    let data: Vitals[] = [];
    let idx = 0;

    // load sampleVitals.json
    (async () => {
      try {
        const resp = await fetch('/data/sampleVitals.json');
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        data = await resp.json();
      } catch (e) {
        console.error(e);
        setError('Failed to load vitals');
      }
    })();

    const tick = () => {
      if (paused) return;

      // 10% chance simulate sensor offline
      if (Math.random() < 0.1) {
        setError('Sensor offline');
        return;
      } else if (error === 'Sensor offline') {
        setError(null);
      }

      if (!data.length) return;
      const sample = data[idx % data.length];
      idx++;

      setVitals(sample);
      setHistory(h =>
        [...h.slice(-19), { ...sample, timestamp: new Date().toLocaleTimeString() }]
      );

      // play beep if out of bounds
      if (
        sample.heartRate < thresholds.heartRate.min ||
        sample.heartRate > thresholds.heartRate.max
      ) {
        const audioCtx = new AudioContext();
        const osc = audioCtx.createOscillator();
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      }
    };

    // clear old interval
    if (intervalRef.current) clearInterval(intervalRef.current);
    // new interval scaled by speed
    intervalRef.current = window.setInterval(tick, 1000 / speed);
    return () => clearInterval(intervalRef.current);
  }, [paused, speed]);

  const togglePause = () => setPaused(p => !p);
  const setSpeed = (s: number) => setSpeedState(s);
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  const exportHistory = () => {
    const csvRows = [
      ['Time', 'HeartRate', 'Oxygen', 'Temperature'],
      ...history.map(r => [r.timestamp, r.heartRate, r.oxygen, r.temperature].map(String))
    ];
    const csv = csvRows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'vitals.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <BiometricContext.Provider
      value={{
        vitals,
        history,
        paused,
        speed,
        theme,
        error,
        togglePause,
        setSpeed,
        exportHistory,
        toggleTheme
      }}
    >
      {children}
    </BiometricContext.Provider>
  );
};