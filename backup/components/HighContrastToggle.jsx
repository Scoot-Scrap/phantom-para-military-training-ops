import React, { useEffect, useState } from 'react';

export default function HighContrastToggle() {
  const [mode, setMode] = useState(
    () => localStorage.getItem('hc-mode') || 'default'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('hc-mode', mode);
  }, [mode]);

  return (
    <button
      onClick={() =>
        setMode(prev => (prev === 'high-contrast' ? 'default' : 'high-contrast'))
      }
      style={{ margin: '1rem' }}
    >
      {mode === 'high-contrast' ? 'Normal Contrast' : 'High Contrast'}
    </button>
  );
}