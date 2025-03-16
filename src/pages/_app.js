import React from 'react';
import NavBar from '@/components/navbar/NavBar';
import { AuthProvider } from '@/context/AuthContext';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
