// pages/api/push.js

import webpush from '../../lib/webpush';
import { subscriptions } from '../../data/subscriptions';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, body } = req.body;
    const payload = JSON.stringify({ title, body });

    try {
      await Promise.all(
        subscriptions.map(sub =>
          webpush.sendNotification(sub, payload)
        )
      );
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('Push error:', err);
      res.status(500).json({ error: 'Push failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}







push.js
push.js
push.js
push.js
push.js
push.js
push.js