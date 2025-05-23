// /app/components/Footer.jsx

'use client';

export default function Footer() {
  return (
    <footer role="contentinfo" className="footer">
      <p>&copy; {new Date().getFullYear()} Phantom AR</p>
    </footer>
  );
}