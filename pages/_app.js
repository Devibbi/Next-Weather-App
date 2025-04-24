// Removed unnecessary _app.js for styled-components SSR in Next.js 13+.

// import '../styles/globals.css'; // Remove or comment out this line to fix the error
import { ThemeProvider } from 'styled-components';
import React, { useState } from 'react';

const lightTheme = {
  mode: 'light',
  background: '#f8fafc',
  text: '#232946',
};
const darkTheme = {
  mode: 'dark',
  background: '#232946',
  text: '#e0e7ef',
};

export default function App({ Component, pageProps }) {
  // Theme toggle for dark/light mode
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.mode === 'light' ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: 18,
          right: 18,
          zIndex: 9999,
          background: theme.mode === 'dark' ? '#232946' : '#fff',
          color: theme.mode === 'dark' ? '#fff' : '#232946',
          border: '1.5px solid #2563eb',
          borderRadius: '16px',
          padding: '0.6rem 1.2rem',
          fontWeight: 700,
          fontSize: '1.08rem',
          boxShadow: '0 2px 8px #23294622',
          cursor: 'pointer',
        }}
        aria-label="Toggle dark/light mode"
      >
        {theme.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
