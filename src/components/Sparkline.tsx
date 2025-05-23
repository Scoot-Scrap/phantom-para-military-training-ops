import React from 'react';

interface SparklineProps {
  data: number[];
}

export const Sparkline: React.FC<SparklineProps> = ({ data }) => {
  // normalize to 0–100 box, flip y
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d - Math.min(...data)) / (Math.max(...data) - Math.min(...data) || 1)) * 100;
    return `${x},${y}`;
  });

  return (
    <svg viewBox="0 0 100 100" width="50" height="20" aria-hidden="true">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        points={points.join(' ')}
        style={{ transition: 'all 0.3s ease-out' }}
      />
    </svg>
  );
};