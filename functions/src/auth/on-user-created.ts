import { auth } from "firebase-functions/v2";
import { getFirestore } from "firebase-admin/firestore";
import { COLLECTIONS, SEED_INTERNAL_DOMAINS, SEED_ADMIN_EMAILS } from "@twg/shared";

/**
 * Triggered when a new Firebase Auth user is created.
 *
 * TODO: auto-provision internal admins
 *   - Check if email domain is in domainAllowlist (seed: shiekhshoes.org)
 *   - Check if email is in emailAllowlist (seed: theo@shiekhshoes.org, theo@shiekh.com)
 *   - Create user document in Firestore
 *   - Assign default internal admin role if domain/email matches
 *   - Set custom claims for role-based access
 *   - Log activity event
 */
export const onUserCreated = auth.user().onCreate(async (user) => {
  const db = getFirestore();
  const email = user.email?.toLowerCase() ?? "";
  const domain = email.split("@")[1] ?? "";

  // TODO: implement allowlist checks against domainAllowlist and emailAllowlist collections
  const _isInternalDomain = SEED_INTERNAL_DOMAINS.some((d) => d === domain);
  const _isAllowlistedEmail = SEED_ADMIN_EMAILS.some((e) => e === email);

  // TODO: create user record in Firestore
  await db.collection(COLLECTIONS.users).doc(user.uid).set({
    id: user.uid,
    firebaseUid: user.uid,
    email,
    displayName: user.displayName ?? email,
    category: "internal", // TODO: determine category from allowlist
    roleIds: [], // TODO: assign default role
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    updatedBy: "system",
  });

  // TODO: set custom claims for RBAC
  // TODO: activity/audit event creation
});
