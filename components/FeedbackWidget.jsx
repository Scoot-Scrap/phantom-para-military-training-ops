// components/FeedbackWidget.jsx

'use client';
import { useEffect } from 'react';

export default function FeedbackWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.hotjar.com/c/hotjar-XXXXXX.js?sv=6';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <button
      style={{
        position: 'fixed',
        right: '1rem',
        bottom: '1rem',
        padding: '0.75rem 1.25rem',
        background: '#f90',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        zIndex: 1000,
      }}
      onClick={() => window.hj?.('trigger', 'feedback_form')}
      aria-label="Give feedback"
    >
      Feedback
    </button>
  );
}