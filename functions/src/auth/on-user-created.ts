import * as auth from "firebase-functions/v1/auth";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { COLLECTIONS, SEED_INTERNAL_DOMAINS, SEED_ADMIN_EMAILS } from "../config/seed-constants";

/**
 * Triggered when a new Firebase Auth user is created.
 * Sets custom claims and creates user document in Firestore.
 *
 * Claims structure: { role: "owner"|"admin"|"member", category: "internal"|"external" }
 */
export const onUserCreated = auth.user().onCreate(async (user) => {
  const db = getFirestore();
  const adminAuth = getAuth();
  const email = user.email?.toLowerCase() ?? "";
  const domain = email.split("@")[1] ?? "";

  // Determine role and category from seed constants
  const isAdminEmail = SEED_ADMIN_EMAILS.some((e) => e === email);
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
    role = "member";
    category = "external";
  }

  // Set custom claims on the user token
  await adminAuth.setCustomUserClaims(user.uid, { role, category });

  // Create user document in Firestore
  const now = new Date().toISOString();
  await db.collection(COLLECTIONS.users).doc(user.uid).set({
    id: user.uid,
    firebaseUid: user.uid,
    email,
    displayName: user.displayName ?? email,
    category,
    roleIds: [],
    isActive: true,
    createdAt: now,
    updatedAt: now,
    createdBy: "system",
    updatedBy: "system",
  });
});
