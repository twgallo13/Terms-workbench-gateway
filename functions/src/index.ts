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
// TODO: export callable functions as they are built:
//   - generateAccessLink
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
