export const metadata = {
  title: "IRL Tactical AR Training System",
  description:
    "Elite real-world martial arts simulation across all devices and realities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="app-container">
          <header className="header">
            <h1>IRL Tactical AR Training</h1>
          </header>
          {children}
          <footer className="footer">
            <p>© 2025 IRL Tactical Systems. All Rights Reserved.</p>
          </footer>
        </main>
      </body>
    </html>
  );
}
