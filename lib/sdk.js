// lib/sdk.js

const BASE = process.env.NEXT_PUBLIC_BASE_URL || '';

export async function fetchVitals() {
  const res = await fetch(`${BASE}/api/biometric/sampleVitals`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

export async function postVitals(vitals) {
  const res = await fetch(`${BASE}/api/biometric/sampleVitals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vitals),
  });
  if (!res.ok) throw new Error('Network error');
  return res.json();
}