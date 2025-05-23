// components/NavBar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const linkStyle: React.CSSProperties = {
    marginRight: "1rem",
    color: "#fff",
    textDecoration: "none",
  };

  return (
    <nav style={{ padding: "1rem", backgroundColor: "#222" }}>
      <Link href="/" style={linkStyle}>
        Home
      </Link>
      <Link href="/dashboard" style={linkStyle}>
        Dashboard
      </Link>
      {pathname !== "/login" && (
        <Link href="/login" style={linkStyle}>
          Login
        </Link>
      )}
      {pathname !== "/register" && (
        <Link href="/register" style={linkStyle}>
          Register
        </Link>
      )}
    </nav>
  );
}
