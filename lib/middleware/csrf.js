// File: lib/middleware/csrf.js

import csrf from 'csrf';                                                          // csurf-compatible library :contentReference[oaicite:20]{index=20}

const tokens = new csrf();

export function generateCsrfToken(req, res) {
  const secret = tokens.secretSync();
  const token  = tokens.create(secret);
  // Set both server-side and client-accessible cookie
  res.setHeader('Set-Cookie', [
    `csrfSecret=${secret}; HttpOnly; SameSite=Strict; Path=/api; Secure`,
    `csrfToken=${token}; Path=/; SameSite=Strict; Secure`,
  ]);
  return token;
}

export function verifyCsrf(req, res) {
  const secret = req.cookies.csrfSecret;
  const token  = req.headers['x-csrf-token'] || req.cookies.csrfToken;
  if (!tokens.verify(secret, token)) {
    res.status(403).json({ error: 'Invalid CSRF token' });
    throw new Error('CSRF validation failed');
  }
}