import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase/admin";

const SESSION_COOKIE_NAME = "__session";

export interface SessionUser {
  uid: string;
  email: string;
  role: string;
  category: string;
}

/**
 * Verify the session cookie and return the decoded user.
 * Returns null if no valid session exists.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) return null;

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

    return {
      uid: decoded.uid,
      email: decoded.email ?? "",
      role: (decoded.role as string) ?? "",
      category: (decoded.category as string) ?? "",
    };
  } catch {
    return null;
  }
}

/**
 * Require an authenticated internal user. Redirects to /login if not authenticated
 * or if the user is not internal.
 */
export async function requireInternalUser(): Promise<SessionUser> {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  // Allow users whose claims haven't propagated yet — they'll see a provisioning state client-side.
  // Only hard-block if category is explicitly "external".
  if (user.category === "external") {
    redirect("/login?error=unauthorized");
  }

  return user;
}
