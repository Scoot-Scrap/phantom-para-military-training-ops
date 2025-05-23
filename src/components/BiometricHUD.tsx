import React, { useContext } from 'react';
import { BiometricContext }      from '../context/BiometricContext';
import { Sparkline }             from './Sparkline';
import './BiometricHUD.css';

export const BiometricHUD: React.FC = () => {
  const ctx = useContext(BiometricContext);
  if (!ctx) return null;

  const {
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
  } = ctx;

  return (
    <div className={`hud ${theme}`} role="region" aria-label="Biometric HUD overlay">
      {error && <div className="error">{error}</div>}

      {vitals ? (
        <div className="stats">
          {(['heartRate','oxygen','temperature'] as const).map(key => {
            const val = (vitals as any)[key] as number;
            let upper = 100, lower = 0;
            if (key==='heartRate') { lower=50; upper=120; }
            if (key==='oxygen')    { lower=90; upper=100; }
            if (key==='temperature') { lower=36; upper=37.5; }
            const isAlert = val < lower || val > upper;
            const hist    = history.map(r => (r as any)[key] as number);

            return (
              <div
                key={key}
                className={`stat${isAlert?' alert':''}`}
                aria-live="polite"
                aria-label={`${key} is ${val}`}
              >
                <strong>{key.replace(/([A-Z])/,' $1')}:</strong>{' '}
                <span>{val}</span>
                <Sparkline data={hist} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading vitals...</div>
      )}

      <div className="controls" role="group" aria-label="HUD controls">
        <button onClick={togglePause}>{paused ? 'Resume' : 'Pause'}</button>

        <label>
          Speed:
          <select
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
          >
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={2}>2×</option>
            <option value={4}>4×</option>
          </select>
        </label>

        <button onClick={exportHistory}>Export CSV</button>
        <button onClick={toggleTheme}>Theme: {theme}</button>
      </div>
    </div>
  );
};