// File: components/ConsentModal.jsx

import React, { useState, useEffect } from 'react';

/**
 * Shows a consent modal if not previously accepted.
 */
export default function ConsentModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('gdprConsent')) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gdprConsent', 'true');
    navigator.sendBeacon('/api/audit/log', JSON.stringify({
      event: 'gdpr-consent',
      timestamp: new Date().toISOString(),
    }));                                                        // Audit logging via Beacon API :contentReference[oaicite:13]{index=13}
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="modal">
      <p>
        We store and process your biometric data. By continuing, you consent.
      </p>
      <button onClick={handleAccept}>I Consent</button>
    </div>
  );
}