// components/Roadmap.jsx

'use client';

export default function Roadmap() {
  return (
    <iframe
      src="https://trello.com/b/YourBoardID.html"
      style={{
        width: '100%',
        height: '800px',
        border: 'none',
      }}
      title="Feature Roadmap"
    />
  );
}