// /app/components/Header.jsx

'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <header role="banner" className="header">
      <Image
        src="/logo.svg"
        alt="Phantom AR company logo"
        width={120}
        height={40}
        priority
      />
      <h1>Phantom AR Dashboard</h1>
    </header>
  );
}