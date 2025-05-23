// File: app/layout.js

export const metadata = {
  title: "My Next.js App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 
