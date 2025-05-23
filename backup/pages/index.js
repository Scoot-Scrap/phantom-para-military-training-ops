// File: pages/index.js

import React from 'react';
import Head from 'next/head';

/**
 * Home page listing posts.
 * Data is fetched at build time and revalidated every 60 seconds.
 */
export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main>
        <h1>Latest Posts</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <a href={`/posts/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

/**
 * Fetch posts at build time and revalidate using ISR.
 */
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 60,   // Regenerate this page at most once every 60 seconds :contentReference[oaicite:2]{index=2}
  };
}