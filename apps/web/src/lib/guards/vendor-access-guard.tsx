"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Vendor scoped access guard — wraps vendor-facing routes.
 * TODO: implement actual vendor access verification:
 *   - validate access link token
 *   - check link expiration and revocation
 *   - scope access to assigned vendor/brand/document
 *   - support optional email-based vendor login
 *   - enforce default-deny for all external data
 */
export function VendorAccessGuard({
  children,
  token,
}: {
  children: ReactNode;
  token?: string;
}) {
  useEffect(() => {
    // TODO: validate token against accessLinks collection
    // TODO: check expiration and status
    // TODO: set vendor context for scoped data access
  }, [token]);

  // Phase 0: render children without access check
  return <>{children}</>;
}
