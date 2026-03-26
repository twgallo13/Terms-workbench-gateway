/**
 * Cloud Functions for Firebase Gen 2 — TWG
 *
 * This is the entry point for all server-side functions.
 * Functions are organized by domain and exported from here.
 */

import { initializeApp } from "firebase-admin/app";

initializeApp();

// ─── Auth triggers ──────────────────────────────────────────────────────────
export { onUserCreated } from "./auth/on-user-created";

// ─── Callable functions ─────────────────────────────────────────────────────
export { bootstrapUser } from "./auth/bootstrap-user";

// ─── HTTP functions (CORS-safe) ─────────────────────────────────────────────
export { bootstrapUserOnRequest } from "./auth/bootstrap-user-on-request";

// ─── Callable functions (TODO) ──────────────────────────────────────────────
//   - revokeAccessLink
//   - acceptAgreement
//   - createQuoteVersion
//   - createAgreementVersion
//   - markHandoffReady

// ─── Firestore triggers ────────────────────────────────────────────────────
// TODO: export Firestore triggers as they are built:
//   - onQuoteStatusChange (activity/audit event creation)
//   - onAgreementAccepted (lock version, store snapshot)
//   - onAccessLinkUsed (update status)

// ─── Scheduled functions ────────────────────────────────────────────────────
// TODO: export scheduled functions as they are built:
//   - expireAccessLinks
//   - expireQuotes
