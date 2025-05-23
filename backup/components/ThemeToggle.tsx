// components/ThemeToggle.jsx

import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * A button that toggles between light and dark themes.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-bg)',
        borderRadius: '0.375rem',
        border: 'none',
        fontSize: '1rem'
      }}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}