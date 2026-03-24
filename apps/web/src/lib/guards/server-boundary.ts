/**
 * Server-only action boundary for protected mutations.
 * All sensitive writes should go through server actions that use this boundary.
 */

import {
  requireInternalUser as requireSession,
  type SessionUser,
} from "@/lib/auth/session";

export async function requireInternalUser(): Promise<SessionUser> {
  return requireSession();
}

export async function requirePermission(
  _userId: string,
  _permissionCode: string
): Promise<boolean> {
  // TODO: look up user roles and permissions in Phase 2
  return true;
}

export async function requireVendorScope(
  _userId: string,
  _vendorId: string
): Promise<boolean> {
  // TODO: verify user has access to this vendor's data in Phase 2
  return true;
}
