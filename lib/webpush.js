// lib/webpush.js

import webpush from 'web-push';

// Configure VAPID details for your domain and contact email
webpush.setVapidDetails(
  'mailto:admin@your-domain.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default webpush;