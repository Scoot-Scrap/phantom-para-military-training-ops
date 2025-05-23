// app/components/Widget.jsx

'use client';

import React from 'react';

export default function Widget({ id, content }) {
  return (
    <div
      className="widget"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      <div
        className="widget-handle"
        style={{
          background: '#f0f0f0',
          padding: '0.5rem',
          cursor: 'move',
          fontWeight: 'bold'
        }}
      >
        Widget {id}
      </div>
      <div
        className="widget-content"
        style={{
          padding: '0.5rem',
          flexGrow: 1,
          overflowY: 'auto'
        }}
      >
        {content}
      </div>
    </div>
  );
}