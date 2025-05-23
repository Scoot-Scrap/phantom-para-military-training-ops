// src/components/Spinner.tsx
export default function Spinner() {
  return (
    <div
      className="spinner"
      role="status"
      aria-busy="true"
      aria-label="Loading content..."
    ></div>  // Accessible spinner :contentReference[oaicite:6]{index=6}
}

// src/components/ErrorMessage.tsx
interface ErrorProps {
  message: string;
  retry: () => void;
}

export default function ErrorMessage({ message, retry }: ErrorProps) {
  return (
    <div role="alert" aria-live="assertive">
      <p>Error: {message}</p>
      <button onClick={retry}>Retry</button>
    </div>
  );
}