'use client';

export default function VitalsSkeleton() {
  return (
    <div className="vitals-grid">
      {[
        'Heart Rate',
        'Blood Pressure',
        'O₂ Saturation',
        'Respiratory Rate',
        'Skin Temp',
        'Timestamp',
      ].map((label) => (
        <div key={label} className="skeleton h-6 my-2 w-full" />
      ))}
    </div>
  );
}