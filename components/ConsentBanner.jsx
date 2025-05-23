// components/ConsentBanner.jsx

'use client';
import { useEffect, useState } from 'react';

const COOKIE_NAME = 'ga_consent';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_NAME)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_NAME, 'true');
    setVisible(false);
    window.dataLayer.push({ event: 'ga_consent' });
  };

  if (!visible) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: '#222',
        color: '#fff',
        padding: '1rem',
        textAlign: 'center',
        zIndex: 1000,
      }}
    >
      <span>We use analytics to improve your experience. Accept?</span>{' '}
      <button
        onClick={accept}
        style={{
          marginLeft: '1rem',
          padding: '0.5rem 1rem',
          background: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Accept
      </button>
    </div>
  );
}