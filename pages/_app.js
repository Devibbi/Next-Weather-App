// Removed unnecessary _app.js for styled-components SSR in Next.js 13+.

import '../styles/global.css';
import React, { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  // Theme toggle for dark/light mode
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Accessibility: focus outline always visible
    document.body.style.outline = 'none';
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    });
    return () => {
      document.body.classList.remove('user-is-tabbing');
    };
  }, []);

  return (
    <>
      <button
        style={{position:'fixed',top:16,right:16,zIndex:1000}}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        tabIndex={0}
      >
        {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <Component {...pageProps} />
    </>
  );
}
