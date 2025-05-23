// File: lib/roles.js

export const roles = {
  admin: ['dashboard', 'profile', 'settings'],
  user: ['profile'],
};

/**
 * Check if a user with `role` has access to `route`.
 */
export function canAccess(role, route) {
  return roles[role]?.includes(route);
}