import React from 'react';

/**
 * HeavyChart is dynamically imported in Dashboard to split bundle.
 */
export default function HeavyChart() {
  return (
    <div>
      <h3>📈 Analytics Chart</h3>
      <p>(Chart rendering logic goes here)</p>
    </div>
  );
}