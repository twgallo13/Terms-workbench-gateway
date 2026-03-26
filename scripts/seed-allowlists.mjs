#!/usr/bin/env node
/**
 * Seed emailAllowlist and domainAllowlist into the twg-db-terms named database.
 * Idempotent — skips docs that already exist (matched by email/domain).
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=apps/web/service-account-key.json \
 *     node scripts/seed-allowlists.mjs
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!saPath) {
  console.error("ERROR: Set GOOGLE_APPLICATION_CREDENTIALS to your service account key path.");
  process.exit(1);
}

const absPath = resolve(process.cwd(), saPath);
const sa = JSON.parse(readFileSync(absPath, "utf8"));
const app = initializeApp({ credential: cert(sa) });
const FIRESTORE_DB_ID = process.env.FIRESTORE_DB_ID || "twg-db-terms";
const db = getFirestore(app, FIRESTORE_DB_ID);

const EMAIL_ALLOWLIST = [
  { email: "theo@shiekh.com", role: "system_owner" },
  { email: "theo@shiekhshoes.org", role: "system_owner" },
];

const DOMAIN_ALLOWLIST = [
  { domain: "shiekhshoes.org", role: "internal_admin" },
];

async function seed() {
  console.log(`Seeding allowlists into database: ${FIRESTORE_DB_ID}\n`);

  // Email allowlist
  console.log("── emailAllowlist ──");
  for (const entry of EMAIL_ALLOWLIST) {
    const docId = entry.email.replace(/[^a-zA-Z0-9]/g, "_");
    const ref = db.collection("emailAllowlist").doc(docId);
    const existing = await ref.get();
    if (existing.exists) {
      console.log(`  ⏭️  Skipped (exists): ${entry.email}`);
    } else {
      const now = new Date().toISOString();
      await ref.set({
        ...entry,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: "system",
        updatedBy: "system",
      });
      console.log(`  ✅ Created: ${entry.email} → ${entry.role}`);
    }
  }

  // Domain allowlist
  console.log("\n── domainAllowlist ──");
  for (const entry of DOMAIN_ALLOWLIST) {
    const docId = entry.domain.replace(/[^a-zA-Z0-9]/g, "_");
    const ref = db.collection("domainAllowlist").doc(docId);
    const existing = await ref.get();
    if (existing.exists) {
      console.log(`  ⏭️  Skipped (exists): ${entry.domain}`);
    } else {
      const now = new Date().toISOString();
      await ref.set({
        ...entry,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: "system",
        updatedBy: "system",
      });
      console.log(`  ✅ Created: ${entry.domain} → ${entry.role}`);
    }
  }

  console.log("\nDone.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
