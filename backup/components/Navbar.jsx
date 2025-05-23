// File: components/Navbar.jsx

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : session ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </nav>
  );
}