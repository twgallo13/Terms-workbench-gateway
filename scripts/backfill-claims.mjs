#!/usr/bin/env node

/**
 * Backfill custom claims for existing Firebase Auth users.
 *
 * Usage:
 *   cd apps/web
 *   node ../../scripts/backfill-claims.mjs
 *
 * Requires:
 *   - GOOGLE_APPLICATION_CREDENTIALS pointing to a service account JSON file
 *   - NEXT_PUBLIC_FIREBASE_PROJECT_ID set in environment or .env.local
 *
 * This script reads seed constants and sets the correct custom claims
 * for any user that already exists in Firebase Auth (e.g., created before
 * the onUserCreated Cloud Function was deployed).
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// ── Seed constants (mirrored from @twg/shared) ─────────────────────────────
const SEED_ADMIN_EMAILS = ["theo@shiekhshoes.org", "theo@shiekh.com"];
const SEED_INTERNAL_DOMAINS = ["shiekhshoes.org"];

// ── Init Admin SDK ──────────────────────────────────────────────────────────
const saKeyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!saKeyPath) {
  console.error("ERROR: Set GOOGLE_APPLICATION_CREDENTIALS to your service account key path.");
  process.exit(1);
}

const absPath = resolve(process.cwd(), saKeyPath);
const serviceAccount = JSON.parse(readFileSync(absPath, "utf8"));
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? serviceAccount.project_id;

const app = initializeApp({
  credential: cert(serviceAccount),
  projectId,
});

const auth = getAuth(app);
const FIRESTORE_DB_ID = process.env.FIRESTORE_DB_ID || "twg-db-terms";
const db = getFirestore(app, FIRESTORE_DB_ID);

// ── Main ────────────────────────────────────────────────────────────────────
async function backfill() {
  console.log(`Backfilling claims for project: ${projectId}\n`);

  let nextPageToken;
  let processed = 0;
  let updated = 0;

  do {
    const listResult = await auth.listUsers(100, nextPageToken);

    for (const user of listResult.users) {
      processed++;
      const email = (user.email ?? "").toLowerCase();
      const domain = email.split("@")[1] ?? "";

      const isAdmin = SEED_ADMIN_EMAILS.includes(email);
      const isInternal = SEED_INTERNAL_DOMAINS.includes(domain);

      let role;
      let category;

      if (isAdmin) {
        role = "owner";
        category = "internal";
      } else if (isInternal) {
        role = "member";
        category = "internal";
      } else {
        role = "member";
        category = "external";
      }

      const current = user.customClaims ?? {};
      if (current.role === role && current.category === category) {
        console.log(`  SKIP ${email} — claims already correct (${role}/${category})`);
        continue;
      }

      await auth.setCustomUserClaims(user.uid, { role, category });
      console.log(`  SET  ${email} → ${role}/${category}`);
      updated++;

      // Also ensure Firestore user doc exists
      const docRef = db.collection("users").doc(user.uid);
      const doc = await docRef.get();
      if (!doc.exists) {
        const now = new Date().toISOString();
        await docRef.set({
          id: user.uid,
          firebaseUid: user.uid,
          email,
          displayName: user.displayName ?? email,
          category,
          roleIds: [],
          isActive: true,
          createdAt: now,
          updatedAt: now,
          createdBy: "system:backfill",
          updatedBy: "system:backfill",
        });
        console.log(`       + created Firestore doc for ${email}`);
      }
    }

    nextPageToken = listResult.pageToken;
  } while (nextPageToken);

  console.log(`\nDone. Processed: ${processed}, Updated: ${updated}`);
}

backfill().catch((err) => {
  console.error("Backfill failed:", err);
  process.exit(1);
});
