import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update CSS variables based on theme
    if (theme === 'dark') {
      // Dark theme colors
      document.documentElement.style.setProperty('--color-bg', 'oklch(0.15 0 0)');
      document.documentElement.style.setProperty('--color-bg-alt', 'oklch(0.20 0 0)');
      document.documentElement.style.setProperty('--color-surface', 'oklch(0.18 0 0)');
      document.documentElement.style.setProperty('--color-surface-hover', 'oklch(0.22 0 0)');
      document.documentElement.style.setProperty('--color-border', 'oklch(0.25 0 0)');
      document.documentElement.style.setProperty('--color-border-light', 'oklch(0.22 0 0)');
      document.documentElement.style.setProperty('--color-text', 'oklch(0.95 0 0)');
      document.documentElement.style.setProperty('--color-text-secondary', 'oklch(0.70 0 0)');
      document.documentElement.style.setProperty('--color-text-muted', 'oklch(0.65 0 0)');
      document.documentElement.style.setProperty('--color-text-light', 'oklch(0.55 0 0)');
      document.documentElement.style.setProperty('--color-primary', 'oklch(0.95 0 0)');
      document.documentElement.style.setProperty('--color-primary-hover', 'oklch(0.85 0 0)');
      document.documentElement.style.setProperty('--color-input', 'oklch(0.20 0 0)');
      
      // shadcn variables
      document.documentElement.style.setProperty('--background', 'oklch(0.15 0 0)');
      document.documentElement.style.setProperty('--foreground', 'oklch(0.95 0 0)');
      document.documentElement.style.setProperty('--card', 'oklch(0.18 0 0)');
      document.documentElement.style.setProperty('--card-foreground', 'oklch(0.95 0 0)');
      document.documentElement.style.setProperty('--popover', 'oklch(0.15 0 0)');
      document.documentElement.style.setProperty('--popover-foreground', 'oklch(0.95 0 0)');
      document.documentElement.style.setProperty('--primary', 'oklch(0.95 0 0)');
      document.documentElement.style.setProperty('--primary-foreground', 'oklch(0.15 0 0)');
      document.documentElement.style.setProperty('--secondary', 'oklch(0.20 0 0)');
      document.documentElement.style.setProperty('--secondary-foreground', 'oklch(0.95 0 0)');
      document.documentElement.style.setProperty('--muted', 'oklch(0.22 0 0)');
      document.documentElement.style.setProperty('--muted-foreground', 'oklch(0.65 0 0)');
      document.documentElement.style.setProperty('--accent', 'oklch(0.20 0 0)');
      document.documentElement.style.setProperty('--accent-foreground', 'oklch(0.95 0 0)');
      document.documentElement.style.setProperty('--border', 'oklch(0.25 0 0)');
      document.documentElement.style.setProperty('--input', 'oklch(0.20 0 0)');
      document.documentElement.style.setProperty('--ring', 'oklch(0.95 0 0)');
      document.documentElement.style.setProperty('--sidebar', 'oklch(0.15 0 0)');
      document.documentElement.style.setProperty('--sidebar-foreground', 'oklch(0.95 0 0)');
      document.documentElement.style.setProperty('--sidebar-primary', 'oklch(0.95 0 0)');
      document.documentElement.style.setProperty('--sidebar-pf', 'oklch(0.15 0 0)');
      document.documentElement.style.setProperty('--sidebar-accent', 'oklch(0.20 0 0)');
      document.documentElement.style.setProperty('--sidebar-af', 'oklch(0.95 0 0)');
      document.documentElement.style.setProperty('--sidebar-border', 'oklch(0.22 0 0)');
      document.documentElement.style.setProperty('--sidebar-ring', 'oklch(0.95 0 0)');
    } else {
      // Light theme colors (default)
      document.documentElement.style.setProperty('--color-bg', 'oklch(0.99 0 0)');
      document.documentElement.style.setProperty('--color-bg-alt', 'oklch(0.94 0 0)');
      document.documentElement.style.setProperty('--color-surface', 'oklch(1 0 0)');
      document.documentElement.style.setProperty('--color-surface-hover', 'oklch(0.97 0 0)');
      document.documentElement.style.setProperty('--color-border', 'oklch(0.92 0 0)');
      document.documentElement.style.setProperty('--color-border-light', 'oklch(0.94 0 0)');
      document.documentElement.style.setProperty('--color-text', 'oklch(0 0 0)');
      document.documentElement.style.setProperty('--color-text-secondary', 'oklch(0.44 0 0)');
      document.documentElement.style.setProperty('--color-text-muted', 'oklch(0.55 0 0)');
      document.documentElement.style.setProperty('--color-text-light', 'oklch(0.72 0 0)');
      document.documentElement.style.setProperty('--color-primary', 'oklch(0 0 0)');
      document.documentElement.style.setProperty('--color-primary-hover', 'oklch(0.18 0 0)');
      document.documentElement.style.setProperty('--color-input', 'oklch(0.94 0 0)');
      
      // Reset shadcn variables to light theme
      document.documentElement.style.setProperty('--background', 'oklch(0.99 0 0)');
      document.documentElement.style.setProperty('--foreground', 'oklch(0 0 0)');
      document.documentElement.style.setProperty('--card', 'oklch(1 0 0)');
      document.documentElement.style.setProperty('--card-foreground', 'oklch(0 0 0)');
      document.documentElement.style.setProperty('--popover', 'oklch(0.99 0 0)');
      document.documentElement.style.setProperty('--popover-foreground', 'oklch(0 0 0)');
      document.documentElement.style.setProperty('--primary', 'oklch(0 0 0)');
      document.documentElement.style.setProperty('--primary-foreground', 'oklch(1 0 0)');
      document.documentElement.style.setProperty('--secondary', 'oklch(0.94 0 0)');
      document.documentElement.style.setProperty('--secondary-foreground', 'oklch(0 0 0)');
      document.documentElement.style.setProperty('--muted', 'oklch(0.97 0 0)');
      document.documentElement.style.setProperty('--muted-foreground', 'oklch(0.44 0 0)');
      document.documentElement.style.setProperty('--accent', 'oklch(0.94 0 0)');
      document.documentElement.style.setProperty('--accent-foreground', 'oklch(0 0 0)');
      document.documentElement.style.setProperty('--border', 'oklch(0.92 0 0)');
      document.documentElement.style.setProperty('--input', 'oklch(0.94 0 0)');
      document.documentElement.style.setProperty('--ring', 'oklch(0 0 0)');
      document.documentElement.style.setProperty('--sidebar', 'oklch(0.99 0 0)');
      document.documentElement.style.setProperty('--sidebar-foreground', 'oklch(0 0 0)');
      document.documentElement.style.setProperty('--sidebar-primary', 'oklch(0 0 0)');
      document.documentElement.style.setProperty('--sidebar-pf', 'oklch(1 0 0)');
      document.documentElement.style.setProperty('--sidebar-accent', 'oklch(0.94 0 0)');
      document.documentElement.style.setProperty('--sidebar-af', 'oklch(0 0 0)');
      document.documentElement.style.setProperty('--sidebar-border', 'oklch(0.94 0 0)');
      document.documentElement.style.setProperty('--sidebar-ring', 'oklch(0 0 0)');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setThemeMode = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
