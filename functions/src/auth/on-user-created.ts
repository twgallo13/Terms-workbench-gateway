import * as auth from "firebase-functions/v1/auth";
import { provisionUserCore } from "./provision-user-core";

/**
 * Triggered when a new Firebase Auth user is created.
 * Delegates to the shared provisionUserCore helper which sets custom claims
 * and creates the user document in Firestore.
 *
 * Claims structure: { role: "owner"|"admin"|"member", category: "internal"|"external" }
 */
export const onUserCreated = auth.user().onCreate(async (user) => {
  const email = user.email?.toLowerCase() ?? "";
  if (!email) {
    console.warn(`[onUserCreated] User ${user.uid} has no email — skipping provisioning.`);
    return;
  }

  await provisionUserCore(user.uid, email, user.displayName ?? undefined);
});
