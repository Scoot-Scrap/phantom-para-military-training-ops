import React from 'react';
import Link from 'next/link';

/**
 * Main navigation with Next.js prefetch enabled.
 * Hovering or idle time will warm the cache for these routes.
 */
export default function Nav() {
  return (
    <nav style={{ padding: '1rem', background: '#fafafa' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0 }}>
        <li>
          <Link href="/dashboard" prefetch={true}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/settings" prefetch={true}>
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}