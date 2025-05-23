import Link from 'next/link'
import React from 'react'

export default function Nav() {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          {/* prefetch=true tells Next.js to load data and code in the background */}
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
  )
}