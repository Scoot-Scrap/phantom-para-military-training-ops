import React from 'react';

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      style={{
        position: 'absolute',
        top: '0',
        left: '-9999px',
        padding: '1rem',
        backgroundColor: '#000',
        color: '#fff',
        zIndex: 1000,
        transition: 'left 0.3s ease',
      }}
      onFocus={(e) => {
        e.currentTarget.style.left = '1rem';
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = '-9999px';
      }}
    >
      Skip to main content
    </a>
  );
}