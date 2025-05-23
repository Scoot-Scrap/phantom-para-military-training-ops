// /app/components/VitalCard.jsx

'use client';

export default function VitalCard({ label, value }) {
  return (
    <div className="vital-card">
      <span className="vital-label">{label}</span>
      <span className="vital-value">{value}</span>
    </div>
  );
}