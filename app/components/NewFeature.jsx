// app/components/NewFeature.jsx

'use client'

import React from 'react'

export default function NewFeature() {
  return (
    <div
      style={{
        padding: '1rem',
        marginBottom: '1rem',
        border: '2px dashed var(--primary-color)',
        borderRadius: '4px',
        background: 'rgba(0, 112, 243, 0.1)',
      }}
    >
      <h2>🚀 New Dashboard Feature</h2>
      <p>This section is gated by a LaunchDarkly feature flag.</p>
    </div>
  )
}