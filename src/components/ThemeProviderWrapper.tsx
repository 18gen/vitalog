'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a context to manage dark mode globally
const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
});

// Hook to access theme toggle anywhere in the app
export function useThemeToggle() {
  return useContext(ThemeContext);
}

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage (optional)
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', String(newMode)); // Save preference
      return newMode;
    });
  };

  // Define themes
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
