#!/usr/bin/env node
/**
 * Seed the default sites into Firestore.
 * Idempotent — skips sites that already exist (matched by domain).
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=apps/web/service-account-key.json \
 *     node scripts/seed-sites.mjs
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// ── Load service account ─────────────────────────────────────────────────────
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

// ── Seed data (mirrors SEED_SITES from @twg/shared) ─────────────────────────
const SEED_SITES = [
  { name: "Shiekh.com", domain: "shiekh.com", displayLabel: "Shiekh.com" },
  { name: "Karmaloop.com", domain: "karmaloop.com", displayLabel: "Karmaloop.com" },
  { name: "MLTD.com", domain: "mltd.com", displayLabel: "MLTD.com" },
];

async function seed() {
  console.log("Seeding sites...\n");

  const existing = await db.collection("sites").get();
  const existingDomains = new Set(existing.docs.map((d) => d.data().domain));

  let created = 0;
  let skipped = 0;

  for (let i = 0; i < SEED_SITES.length; i++) {
    const site = SEED_SITES[i];

    if (existingDomains.has(site.domain)) {
      console.log(`  ⏭️  Skipped (exists): ${site.name}`);
      skipped++;
      continue;
    }

    const now = new Date().toISOString();
    const ref = db.collection("sites").doc();
    await ref.set({
      name: site.name,
      displayLabel: site.displayLabel,
      domain: site.domain,
      status: "active",
      sortOrder: i,
      createdAt: now,
      updatedAt: now,
      createdBy: "system-seed",
      updatedBy: "system-seed",
    });

    console.log(`  ✅ Created: ${site.name} (${ref.id})`);
    created++;
  }

  console.log(`\nDone: ${created} created, ${skipped} skipped.`);
}

seed().catch((err) => {
  console.error("SEED FAILED:", err.message || err);
  process.exit(1);
});
