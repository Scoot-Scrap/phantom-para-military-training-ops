// components/LiveVitals.jsx
'use client';
import { useEffect, useState } from 'react';
import pusher from '../lib/pusher';

export default function LiveVitals() {
  const [vitals, setVitals] = useState(null);
  useEffect(() => {
    const channel = pusher.subscribe('vitals');
    channel.bind('update', (data) => setVitals(data));
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);
  if (!vitals) return <p>Waiting for live data...</p>;
  return <pre>{JSON.stringify(vitals, null, 2)}</pre>;
}