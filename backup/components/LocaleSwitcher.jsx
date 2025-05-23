// File: components/LocaleSwitcher.jsx

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

/**
 * LocaleSwitcher renders clickable links for each locale,
 * preserving the current path (asPath) and switching locale on click.
 */
export default function LocaleSwitcher() {
  const { locales, locale: activeLocale, asPath } = useRouter();

  return (
    <nav style={{ padding: "1rem", textAlign: "right" }}>
      {locales.map((loc) => (
        <Link key={loc} href={asPath} locale={loc}>
          <a
            style={{
              margin: "0 8px",
              textDecoration: activeLocale === loc ? "underline" : "none",
            }}
          >
            {loc.toUpperCase()}
          </a>
        </Link>
      ))}
    </nav>
  );
}
