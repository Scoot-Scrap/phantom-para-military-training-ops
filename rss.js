// rss.js
import { Feed } from 'feed';

export default async function handler(req, res) {
  const baseUrl = 'https://your-domain.com';
  const feed = new Feed({
    title: 'Phantom AR Dashboard RSS',
    id: baseUrl,
    link: baseUrl,
  });
  // Example: add items dynamically
  feed.addItem({ title: 'Welcome', id: `${baseUrl}/`, link: `${baseUrl}/` });
  res.setHeader('Content-Type', 'application/rss+xml');
  res.write(feed.rss2());
  res.end();
}