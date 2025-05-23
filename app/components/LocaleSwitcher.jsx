// app/components/LocaleSwitcher.jsx

'use client'

import React from 'react'
import { useRouter } from 'next/router'

export default function LocaleSwitcher() {
  const { locales, locale, asPath } = useRouter()

  const handleChange = (e) => {
    const newLoc = e.target.value
    window.location.href = `/${newLoc}${asPath}`
  }

  return (
    <select
      id="locale-select"
      value={locale}
      onChange={handleChange}
      aria-label="Select language"
      style={{ marginLeft: '1rem', padding: '0.25rem' }}
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc === 'en' ? 'English' : loc === 'es' ? 'Español' : loc}
        </option>
      ))}
    </select>
  )
}