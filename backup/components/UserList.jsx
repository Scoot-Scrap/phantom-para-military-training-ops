import React from 'react';

/**
 * Renders a list of users, or skeleton placeholders if `users` is undefined.
 */
export default function UserList({ users, error }) {
  if (error) {
    return <div role="alert">Error: {error}</div>;
  }

  if (!users) {
    // Show 5 skeleton lines
    return (
      <div aria-label="Loading users" role="presentation">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton" role="presentation" />
        ))}
      </div>
    );
  }

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}