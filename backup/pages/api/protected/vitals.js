// Example usage in an API route
// File: pages/api/protected/vitals.js

import { getSession } from 'next-auth/react';
import { defineAbilityFor } from '../../../lib/ability';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end();

  const ability = defineAbilityFor(session.user);
  if (!ability.can('view', 'VitalsLog')) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // ... fetch and return data
  res.status(200).json({ /* vitals data */ });
}