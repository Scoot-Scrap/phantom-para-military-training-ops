// app/components/Sidebar.jsx

'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside role="complementary" className="sidebar" aria-label="Main navigation">
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/dashboard">Vitals</Link></li>
          <li><Link href="/dashboard/notes">Notes</Link></li>
          <li><Link href="/admin">Edit Content</Link></li>
        </ul>
      </nav>
    </aside>
  );
}