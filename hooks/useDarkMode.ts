import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize from localStorage or system preference
  useEffect(() => {
    const stored = window.localStorage.getItem('darkMode');
    if (stored !== null) {
      setDarkMode(stored === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Apply to <html> and persist
  useEffect(() => {
    const classList = document.documentElement.classList;
    if (darkMode) classList.add('dark');
    else classList.remove('dark');
    window.localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
}