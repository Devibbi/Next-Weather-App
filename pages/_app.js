// Removed unnecessary _app.js for styled-components SSR in Next.js 13+.

// Import persistent splash background CSS for instant load, no flicker
import '../public/_splashfix.css';
import '../styles/global.css';
import { ThemeProvider } from 'styled-components';
import { SessionProvider } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import CloudSplash from '../components/CloudSplash';
import { signOut, useSession } from 'next-auth/react';

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

// Add instant static splash overlay for SSR/initial load flicker prevention
function StaticSplash() {
  return (
    <div id="static-splash-overlay" style={{
      position: 'fixed',
      zIndex: 1000000,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(180deg, #bcd1e6 60%, #7e9bbd 100%)',
      transition: 'opacity 0.3s',
      pointerEvents: 'none',
    }} />
  );
}

function LogoutButton() {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <button
      onClick={() => signOut()}
      style={{
        background: '#ef4444',
        color: '#fff',
        border: 'none',
        borderRadius: 12,
        padding: '0.6rem 1.2rem',
        fontWeight: 700,
        fontSize: '1.08rem',
        boxShadow: '0 2px 8px #ef444422',
        cursor: 'pointer',
      }}
      aria-label="Logout"
    >
      Logout
    </button>
  );
}

export default function App({ Component, pageProps }) {
  // Theme toggle for dark/light mode
  const [theme, setTheme] = useState(lightTheme);
  const [showSplash, setShowSplash] = useState(true);
  const [staticSplash, setStaticSplash] = useState(true);

  useEffect(() => {
    // Remove static splash as soon as React is ready
    setStaticSplash(false);
  }, []);

  const toggleTheme = () => {
    setTheme(theme.mode === 'light' ? darkTheme : lightTheme);
  };

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        {staticSplash && <StaticSplash />}
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 10000, display: 'flex', gap: 10 }}>
          <button
            onClick={toggleTheme}
            style={{
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
          <LogoutButton />
        </div>
        <Component {...pageProps} />
        {showSplash && (
          <CloudSplash onFinish={() => setShowSplash(false)} />
        )}
      </ThemeProvider>
    </SessionProvider>
  );
}
