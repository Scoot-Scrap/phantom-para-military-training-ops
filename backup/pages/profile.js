// File: pages/profile.js

import React from 'react';
import { getSession } from 'next-auth/react';

export default function Profile({ session }) {
  return (
    <div className="dashboard-container">
      <h2>Your Profile</h2>
      <p><strong>Name:</strong> {session.user.name}</p>
      <p><strong>Email:</strong> {session.user.email}</p>
      <p><strong>Role:</strong> {session.user.role}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);                    // Retrieve session server-side :contentReference[oaicite:11]{index=11}
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  return { props: { session } };
}