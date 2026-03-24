"use client";

import { useEffect, useState, useCallback, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type AuthStatus = "loading" | "authenticated" | "provisioning" | "unauthenticated";

const MAX_CLAIM_RETRIES = 5;
const CLAIM_RETRY_DELAY_MS = 2000;

/**
 * Internal auth guard — wraps internal (admin) routes.
 * Server layout already verifies session cookie; this guard handles:
 * 1. Client-side auth state subscription
 * 2. Claims provisioning race (new users waiting for Cloud Function)
 * 3. Logout detection
 */
export function InternalAuthGuard({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const router = useRouter();

  const refreshClaimsWithRetry = useCallback(async (user: User): Promise<boolean> => {
    for (let i = 0; i < MAX_CLAIM_RETRIES; i++) {
      const tokenResult = await user.getIdTokenResult(true);
      const category = tokenResult.claims.category as string | undefined;
      if (category === "internal") return true;
      if (category === "external") return false;
      // Claims not set yet — wait and retry
      await new Promise((r) => setTimeout(r, CLAIM_RETRY_DELAY_MS));
    }
    return false;
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("unauthenticated");
        router.replace("/login");
        return;
      }

      // Check if claims are already present
      const tokenResult = await user.getIdTokenResult();
      const category = tokenResult.claims.category as string | undefined;

      if (category === "internal") {
        setStatus("authenticated");
        return;
      }

      if (category === "external") {
        setStatus("unauthenticated");
        router.replace("/login?error=unauthorized");
        return;
      }

      // No claims yet — likely a new user waiting for Cloud Function
      setStatus("provisioning");
      const resolved = await refreshClaimsWithRetry(user);
      if (resolved) {
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
        router.replace("/login?error=provisioning");
      }
    });

    return () => unsubscribe();
  }, [router, refreshClaimsWithRetry]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          <p className="text-sm text-gray-500">Loading…</p>
        </div>
      </div>
    );
  }

  if (status === "provisioning") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          <p className="text-sm font-medium text-gray-700">Setting up your account…</p>
          <p className="text-xs text-gray-500">This usually takes a few seconds.</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return <>{children}</>;
}
