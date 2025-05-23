// pages/api/subscribe.js

import { subscriptions } from '../../data/subscriptions';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const subscription = req.body;
    subscriptions.push(subscription);
    // In production, persist to a database instead
    res.status(201).json({ success: true });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}