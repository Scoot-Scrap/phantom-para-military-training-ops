// lib/auth.js

import { getSession } from 'next-auth/react';

export async function requireAdmin(ctx) {
  const session = await getSession(ctx);
  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    };
  }
  return { props: { user: session.user } };
}