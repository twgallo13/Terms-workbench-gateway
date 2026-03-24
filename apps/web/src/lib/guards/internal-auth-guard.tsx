"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Internal auth guard — wraps internal (admin) routes.
 * TODO: implement actual authentication check:
 *   - verify Firebase Auth session
 *   - auto-provision internal admins for @shiekhshoes.org
 *   - check allowlist for other internal emails
 *   - redirect unauthenticated users to /login
 */
export function InternalAuthGuard({ children }: { children: ReactNode }) {
  useEffect(() => {
    // TODO: subscribe to Firebase auth state
    // TODO: verify user has internal role/claim
    // TODO: redirect to /login if unauthenticated
  }, []);

  // Phase 0: render children without auth check
  return <>{children}</>;
}
