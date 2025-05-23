// sitemap.js

export default async function handler(req, res) {
  const baseUrl = 'https://your-domain.com';
  const staticPages = ['/', '/dashboard', '/api-docs'];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map((page) => `
      <url>
        <loc>${baseUrl}${page}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `)
      .join('')}
  </urlset>`;
  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
}