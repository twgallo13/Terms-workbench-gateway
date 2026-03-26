import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { COLLECTIONS, FIRESTORE_DB_ID, SEED_INTERNAL_DOMAINS, SEED_ADMIN_EMAILS } from "../config/seed-constants";

export interface ProvisionResult {
  status: "success" | "denied";
  role?: string;
  category?: string;
  reason?: string;
}

/**
 * Core provisioning logic shared by onUserCreated, bootstrapUser (onCall),
 * and bootstrapUserOnRequest (onRequest).
 *
 * Idempotent: safe to call multiple times for the same user.
 * Sets custom claims and creates/updates the Firestore user document.
 */
export async function provisionUserCore(uid: string, email: string, displayName?: string): Promise<ProvisionResult> {
  const db = getFirestore(FIRESTORE_DB_ID);
  const adminAuth = getAuth();
  const normalizedEmail = email.toLowerCase();
  const domain = normalizedEmail.split("@")[1] ?? "";

  // Determine role and category from seed constants
  const isAdminEmail = SEED_ADMIN_EMAILS.some((e) => e === normalizedEmail);
  const isInternalDomain = SEED_INTERNAL_DOMAINS.some((d) => d === domain);

  let role: string;
  let category: string;

  if (isAdminEmail) {
    role = "owner";
    category = "internal";
  } else if (isInternalDomain) {
    role = "member";
    category = "internal";
  } else {
    // Unrecognized email — deny access
    console.warn(`[provisionUserCore] ACCESS_DENIED_UNRECOGNIZED: ${normalizedEmail}`);
    return {
      status: "denied",
      reason: "ACCESS_DENIED_UNRECOGNIZED",
    };
  }

  // Set custom claims on the user token
  await adminAuth.setCustomUserClaims(uid, { role, category });

  // Create or merge user document in Firestore (idempotent)
  const now = new Date().toISOString();
  const userRef = db.collection(COLLECTIONS.users).doc(uid);
  const existing = await userRef.get();

  if (!existing.exists) {
    await userRef.set({
      id: uid,
      firebaseUid: uid,
      email: normalizedEmail,
      displayName: displayName ?? normalizedEmail,
      category,
      role,
      isInternal: category === "internal",
      roleIds: [],
      isActive: true,
      createdAt: now,
      updatedAt: now,
      createdBy: "system",
      updatedBy: "system",
    });

    // Audit log
    console.log(`[provisionUserCore] USER_PROVISIONED uid=${uid} email=${normalizedEmail} role=${role} category=${category}`);
  } else {
    // User already exists — update claims-related fields to stay in sync
    await userRef.update({
      role,
      category,
      isInternal: category === "internal",
      updatedAt: now,
      updatedBy: "system",
    });
    console.log(`[provisionUserCore] USER_UPDATED uid=${uid} email=${normalizedEmail} role=${role} category=${category}`);
  }

  return {
    status: "success",
    role,
    category,
  };
}
