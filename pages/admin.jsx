// pages/admin.jsx

import { requireAdmin } from '../lib/auth';

export default function Admin({ user }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name} (role: {user.role})</p>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return await requireAdmin(ctx);
}