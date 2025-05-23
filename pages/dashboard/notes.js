// pages/dashboard/notes.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default function NotesPage({ data }) {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{data.title}</h1>
        <Link href="/admin">
          <button
            style={{
              background: '#0070f3',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Edit Notes
          </button>
        </Link>
      </header>
      <article style={{ marginTop: '1rem', lineHeight: 1.6 }}>
        <ReactMarkdown>{data.body}</ReactMarkdown>
      </article>
    </main>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content/notes/dashboard.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    props: {
      data: {
        title: data.title,
        body: content,
      },
    },
  };
}