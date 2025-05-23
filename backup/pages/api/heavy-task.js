// File: pages/api/heavy-task.js

export const runtime = 'nodejs';                           // Use the Node.js runtime for compatibility :contentReference[oaicite:4]{index=4}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Dynamically load the heavy module to keep initial bundle small :contentReference[oaicite:5]{index=5}
    const { process } = await import('../../lib/heavyModule.js');
    const result = await process();
    return res.status(200).json({ result });
  } catch (err) {
    console.error('Heavy task error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}