// File: lib/ability.js

import { AbilityBuilder, Ability } from '@casl/ability';                       // CASL v4 :contentReference[oaicite:22]{index=22}

export function defineAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === 'admin') {
    can('manage', 'all');                                                       // Admin: full access
  } else {
    can('read', 'Profile', { id: user.id });                                    // Users: only view their own profile
    cannot('delete', 'User');                                                    // Deny destructive actions
  }

  // Example ABAC: only cardiology clinicians can view cardiology logs
  if (user.department === 'cardiology') {
    can('view', 'VitalsLog');
  }

  return build();
}