// File: pages/dashboard.js

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the heavy chart component, disabling SSR for it
const HeavyChart = dynamic(
  () => import('../components/HeavyChart'),
  {
    loading: () => <p>Loading chart…</p>,     // Fallback while loading :contentReference[oaicite:6]{index=6}
    ssr: false,                                // Only load on the client to reduce server bundle size 
  }
);

export default function Dashboard() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <HeavyChart />                             {/* Lazy-loaded heavy component :contentReference[oaicite:8]{index=8} */}
    </main>
  );
}