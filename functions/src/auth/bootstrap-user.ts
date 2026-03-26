import * as functions from "firebase-functions/v1";
import { provisionUserCore } from "./provision-user-core";

/**
 * bootstrapUser — Firebase onCall callable function.
 *
 * Called by the client via httpsCallable("bootstrapUser") after sign-in.
 * Validates that the caller is authenticated, then provisions the user
 * (sets custom claims + creates Firestore document).
 *
 * Returns { status, role, category } on success or throws HttpsError on failure.
 */
export const bootstrapUser = functions.https.onCall(async (_data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Must be signed in to bootstrap user.",
    );
  }

  const uid = context.auth.uid;
  const email = context.auth.token.email;

  if (!email) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "User must have an email address.",
    );
  }

  const displayName = context.auth.token.name as string | undefined;

  const result = await provisionUserCore(uid, email, displayName);

  if (result.status === "denied") {
    throw new functions.https.HttpsError(
      "permission-denied",
      result.reason ?? "Access denied.",
    );
  }

  return result;
});
