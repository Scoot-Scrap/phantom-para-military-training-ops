export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav aria-label="Main navigation">
        {/* navigation links */}
      </nav>
      <main role="main" aria-labelledby="app-heading">
        <h1 id="app-heading">App Title</h1>
        {children}
      </main>
      <footer aria-label="Footer">
        {/* footer content */}
      </footer>
    </div>
  );
}