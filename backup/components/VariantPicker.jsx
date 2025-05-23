'use client'; // marks this as a client component

import React from 'react';

export default function VariantPicker({ options, onSelect }) {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}