# Phase 2 — Master Data Foundation

> **Status:** Planning only — not yet approved for implementation
> **Branch:** `plan/phase-2-master-data`
> **Predecessor:** Phase 1B (`phase-1b-internal-auth` tag, commit `9e9c208`)

---

## 1. Scope

Phase 2 delivers the **read/write data layer** for the four foundational entities that every downstream feature depends on: **Sites, Vendors, Brands, and Contacts**. All quote, agreement, and handoff workflows require these entities to exist first.

### In scope

| Capability | Detail |
|---|---|
| **Firestore CRUD** | Server-side data access functions for Sites, Vendors, Brands, Contacts, and BrandContactAssignments |
| **Server Actions or Route Handlers** | Typed create / read / update operations callable from UI |
| **List pages** | Real data-driven tables replacing placeholder content on `/sites`, `/vendors`, `/brands`, `/contacts` |
| **Detail pages** | Real data rendering on `/vendors/[vendorId]`, `/brands/[brandId]` |
| **Create / Edit forms** | Validated forms for each entity using the existing `@twg/shared` models |
| **Seed data script** | One-time script to populate the three default sites (Shiekh.com, Karmaloop.com, MLTD.com) |
| **Activity logging** | Write `activityLogs` entries on every create/update |
| **Firestore rules hardening** | Replace skeleton `isInternalUser()` / `isAdmin()` with real claim checks |

### Out of scope (deferred to Phase 3+)

- Quotes, Agreements, and versioning workflows
- PDF generation
- Vendor-facing review portal
- Access links and secure acceptance
- Cloud Functions beyond `onUserCreated`
- Search, filtering, saved views
- Notifications and task queue

---

## 2. Dependency Order

```
Sites (no dependencies)
  ↓
Vendors (no dependencies)
  ↓
Brands (depends on Vendors)
  ↓
Contacts (depends on Vendors)
  ↓
BrandContactAssignments (depends on Brands + Contacts)
  ↓
SiteApprovals (depends on Brands + Sites)
```

**Sites and Vendors are independent** — they can be built in parallel.
Brands and Contacts both depend on Vendors.
BrandContactAssignments and SiteApprovals are junction entities that come last.

---

## 3. Build Sequence

### Step 2A — Data access layer + Sites

1. Create `apps/web/src/lib/firestore/` module with typed helpers:
   - `getDoc<T>`, `listDocs<T>`, `createDoc<T>`, `updateDoc<T>` wrappers using Admin SDK
   - Automatic `createdAt/By`, `updatedAt/By` stamping
   - `activityLogs` write on every mutation
2. Implement Sites CRUD (admin-only write, all-internal read)
3. Create seed script for the three default sites
4. Wire `/sites` page to real data (list + create/edit inline or modal)
5. Harden Firestore rules: `isInternalUser()` → checks `request.auth.token.category == "internal"`, `isAdmin()` → checks `request.auth.token.role == "owner"`

### Step 2B — Vendors

1. Vendor create/edit form (legal name, DBA, tax ID, website, addresses)
2. Vendor list page with status filtering
3. Vendor detail page (`/vendors/[vendorId]`)
4. Status transitions: `draft → active → inactive`

### Step 2C — Brands + Contacts

1. Brand create/edit (linked to vendor)
2. Brand list and detail pages
3. Contact create/edit (linked to vendor)
4. Contact list page
5. BrandContactAssignment management (assign contacts to brands)

### Step 2D — Site Approvals + integration

1. SiteApproval entity (approve a brand for specific sites)
2. Wire site approvals into brand detail page
3. Dashboard: replace placeholder sections with real counts/queries
4. End-to-end verification: create vendor → add brand → add contacts → assign contacts to brand → approve brand for sites

---

## 4. Risk Points

| Risk | Impact | Mitigation |
|---|---|---|
| **Firestore index creation** | Composite queries may fail until indexes auto-create | Run each new query in dev to trigger index creation early; commit `firestore.indexes.json` |
| **Admin SDK cold starts** | First request after idle may be slow | Already mitigated — admin SDK initializes lazily with singleton pattern |
| **Data model drift** | Shared models may need field additions during implementation | Keep `@twg/shared` models as source of truth; add fields there first, then propagate |
| **Form validation complexity** | Address fields, tax ID formats, email validation | Use progressive validation — required fields only at first, advanced validation later |
| **Activity log volume** | Every mutation writes an extra document | Acceptable at current scale; revisit if write costs increase |
| **Security rules complexity** | Claim-based rules must match guard logic exactly | Test rules with Firebase emulator or manual curl calls; document expected claim shapes |

---

## 5. First Implementation Step

**Start with Step 2A: data access layer + Sites.**

Concrete first PR deliverables:

1. `apps/web/src/lib/firestore/admin-db.ts` — Firestore Admin client singleton
2. `apps/web/src/lib/firestore/helpers.ts` — typed CRUD helpers (`getDoc`, `listCollection`, `createDoc`, `updateDoc`)
3. `apps/web/src/lib/firestore/activity.ts` — `logActivity()` helper
4. `apps/web/src/app/(internal)/sites/page.tsx` — real site list from Firestore
5. `apps/web/src/app/api/sites/route.ts` — GET (list) + POST (create) route handlers
6. `scripts/seed-sites.mjs` — seed Shiekh.com, Karmaloop.com, MLTD.com
7. `firebase/firestore.rules` — hardened claim checks
8. Verification: create a site via UI, confirm it persists, confirm activity log written

**Estimated file count:** 8–10 new/modified files
**Branch name:** `feat/phase-2a-data-layer-sites`

---

## 6. Success Criteria (Phase 2 complete)

- [ ] All four entities (Sites, Vendors, Brands, Contacts) have working CRUD
- [ ] List pages show real Firestore data
- [ ] Detail pages render real documents
- [ ] BrandContactAssignments and SiteApprovals are functional
- [ ] Activity logs record every mutation
- [ ] Firestore rules enforce real claim checks
- [ ] Dashboard shows live entity counts
- [ ] Three default sites seeded
- [ ] All existing e2e tests still pass
