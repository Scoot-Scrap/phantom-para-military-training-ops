// app/components/PushNotification.jsx

'use client';

import React, { useEffect, useState } from 'react';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

export default function PushNotification() {
  const [supported, setSupported] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setSupported(true);
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(sub => {
          setSubscribed(Boolean(sub));
        });
      });
    }
  }, []);

  const subscribe = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      ),
    });
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription),
    });
    setSubscribed(true);
  };

  if (!supported) return null;

  return (
    <button
      onClick={subscribe}
      disabled={subscribed}
      style={{
        margin: '0 1rem',
        padding: '0.5rem 1rem',
        background: subscribed ? '#ccc' : '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: subscribed ? 'default' : 'pointer',
      }}
    >
      {subscribed ? 'Notifications Enabled' : 'Enable Notifications'}
    </button>
  );
}