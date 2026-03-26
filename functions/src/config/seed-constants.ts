/**
 * Auth-related seed constants for Cloud Functions.
 * Mirrored from @twg/shared — kept in sync manually until a bundling
 * solution is adopted for Cloud Functions deployment.
 */

/** Named Firestore database ID — must match the client SDK config. */
export const FIRESTORE_DB_ID = process.env.FIRESTORE_DB_ID || "twg-db-terms";

export const SEED_ADMIN_EMAILS = [
  "theo@shiekhshoes.org",
  "theo@shiekh.com",
] as const;

export const SEED_INTERNAL_DOMAINS = [
  "shiekhshoes.org",
] as const;

export const COLLECTIONS = {
  users: "users",
} as const;
