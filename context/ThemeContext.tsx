import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import debounce from 'lodash.debounce';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setThemeRaw] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  // Debounce actual attribute update for performance
  const applyTheme = debounce(newTheme => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }, 100);

  function setTheme(newTheme) {
    setThemeRaw(newTheme);
    applyTheme(newTheme);
  }

  useEffect(() => {
    applyTheme(theme);
    return () => applyTheme.cancel();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);