// pages/api/auth/github.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) {
    res.status(400).send('Missing code parameter');
    return;
  }

  // Exchange the code for an access token
  const tokenRes = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_APP_ID,
        client_secret: process.env.GITHUB_APP_SECRET,
        code: code,
      }),
    }
  );

  const { access_token } = await tokenRes.json();
  if (!access_token) {
    res.status(500).send('Failed to obtain access token');
    return;
  }

  // Redirect back into Netlify CMS, passing the token
  res.redirect(`/admin/?provider=github&token=${access_token}`);
}