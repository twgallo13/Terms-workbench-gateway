# Phase 2B — Vendors Foundation

> **Status:** Planning only — not yet approved for implementation  
> **Branch:** `plan/phase-2b-vendors`  
> **Predecessor:** Phase 2A (`phase-2a-data-layer-sites` tag, commit `229b67d`)

---

## 1. Scope

Phase 2B delivers the **Vendors entity CRUD** — the second foundational entity in the Phase 2 dependency chain. Brands and Contacts (Phase 2C) depend on Vendors existing first.

### In scope

| Capability | Detail |
|---|---|
| **Vendor server actions** | `getVendors()`, `getVendor()`, `createVendor()`, `updateVendor()` using the existing `lib/firestore` helpers |
| **Vendor list page** | `/vendors` — real data-driven table replacing placeholder content, with status filtering |
| **Vendor detail page** | `/vendors/[vendorId]` — display vendor fields, edit inline or via form |
| **Create / Edit form** | Validated form: `legalCompanyName` (required), `dba`, `taxId`, `website`, `businessAddress`, `returnAddress`, `status` |
| **Status transitions** | `active`, `inactive`, `suspended`, `archived` — enforced in server actions |
| **Activity logging** | Write `activityLogs` entries on every create/update (reuse existing `logActivity`) |
| **Internal-user write access** | All internal users can create/edit vendors (not admin-only like Sites) |

### Out of scope (deferred)

- Brands, Contacts, BrandContactAssignments (Phase 2C)
- SiteApprovals (Phase 2D)
- Vendor search, saved views, advanced filtering
- Vendor deletion (soft-delete pattern deferred)
- File attachments (W-9, certificates)

---

## 2. Dependency Order

```
Phase 2A (completed)
  Sites ✅
  Data layer helpers ✅
  Firestore rules ✅
    ↓
Phase 2B (this plan)
  Vendors (no entity dependencies — uses existing data layer)
    ↓
Phase 2C (future)
  Brands (depends on Vendors)
  Contacts (depends on Vendors)
  BrandContactAssignments (depends on Brands + Contacts)
    ↓
Phase 2D (future)
  SiteApprovals (depends on Brands + Sites)
```

**Vendors have zero entity dependencies.** They reuse the data layer built in Phase 2A.

---

## 3. Build Sequence

### Step 1 — Vendor server actions

1. Create `apps/web/src/app/(internal)/vendors/actions.ts`
2. Implement `getVendors()` — list with optional status filter, ordered by `legalCompanyName`
3. Implement `getVendor(id)` — single document fetch
4. Implement `createVendor(formData)` — validate required fields, create document, log activity
5. Implement `updateVendor(id, formData)` — validate, update, log activity
6. Write access: `requireInternalUser()` (all internal users, not admin-only)
7. Use existing `createDocument<Vendor>`, `updateDocument`, `logActivity` from `lib/firestore`

### Step 2 — Vendor list page

1. Replace placeholder `/vendors` page with server component
2. Fetch real data via `getVendors()` server action
3. Table columns: Legal Name, DBA, Status, Website, Created
4. Status filter (all / active / inactive / suspended / archived)
5. Pass `canManage` based on internal user status
6. "New Vendor" button opens create form (inline card above table, same pattern as Sites)
7. Empty state with call-to-action

### Step 3 — Vendor detail page

1. Create `apps/web/src/app/(internal)/vendors/[vendorId]/page.tsx`
2. Server component: fetch vendor via `getVendor(id)`, 404 if not found
3. Display all fields: legalCompanyName, dba, taxId, website, status, addresses, notes
4. Edit button → inline form or toggle to edit mode
5. Activity log entries for this vendor (optional — list recent from `activityLogs` where `targetId == vendorId`)

### Step 4 — Vendor form

1. Create `apps/web/src/app/(internal)/vendors/vendor-form.tsx`
2. Fields: legalCompanyName (required), dba, taxId, website, status (select), internalNotes (textarea)
3. Address sub-forms for businessAddress and returnAddress (line1, line2, city, state, postalCode, country)
4. Use `useActionState` pattern from Sites
5. Server-side validation in actions.ts
6. Error display, pending state, Cancel/Submit buttons

### Step 5 — Verification

1. Create vendor via UI → confirm persists in Firestore
2. Edit vendor → confirm fields update
3. Verify activity log entries written
4. Verify status filter works on list page
5. Verify vendor detail page renders
6. Verify non-authenticated users cannot access `/vendors`
7. Build passes with no type errors

---

## 4. Risk Points

| Risk | Impact | Mitigation |
|---|---|---|
| **Address form complexity** | Nested `Address` object requires sub-form with 6 fields × 2 addresses | Build address sub-component; make addresses optional initially |
| **FormData with nested objects** | `FormData.get()` is flat — cannot directly extract nested `Address` | Use dot-notation field names (`businessAddress.line1`) and parse in server action |
| **Status transition validation** | Invalid transitions could leave data inconsistent | For 2B, allow any status value from the enum; add transition guards in a future phase if needed |
| **Firestore index for status filter** | `where("status", "==", x) + orderBy("legalCompanyName")` needs composite index | Trigger index creation during dev; commit `firestore.indexes.json` if generated |
| **Vendor detail page routing** | Dynamic `[vendorId]` route must handle missing vendors gracefully | Return `notFound()` from Next.js if `getVendor()` returns null |
| **Internal-user vs admin write access** | Vendors use `isInternalUser()` for writes (not `isAdmin()` like Sites) | Already configured in Firestore rules; server action checks `requireInternalUser()` only |

---

## 5. First Implementation Step

**Start with vendor server actions + list page.**

Concrete first PR deliverables:

1. `apps/web/src/app/(internal)/vendors/actions.ts` — `getVendors`, `getVendor`, `createVendor`, `updateVendor`
2. `apps/web/src/app/(internal)/vendors/page.tsx` — server component list page with real Firestore data
3. `apps/web/src/app/(internal)/vendors/vendors-table.tsx` — client table with inline create, status filter
4. `apps/web/src/app/(internal)/vendors/vendor-form.tsx` — validated form with address sub-forms
5. `apps/web/src/app/(internal)/vendors/[vendorId]/page.tsx` — vendor detail page
6. Update sidebar: ensure Vendors nav item points to real page
7. Verify: create vendor via UI, confirm persistence, confirm activity log, build passes

### Existing infrastructure reused (no changes needed)

- `lib/firestore/helpers.ts` — `createDocument<Vendor>`, `updateDocument`, `listDocuments<Vendor>`, `getDocument<Vendor>`, `logActivity`
- `lib/firestore/index.ts` — already exports all needed helpers
- `packages/shared/src/models/vendors.ts` — `Vendor`, `Address` types already defined
- `packages/shared/src/enums/index.ts` — `VendorStatus` enum already defined
- `firebase/firestore.rules` — vendors write rule already set to `isInternalUser()`
- `COLLECTIONS.vendors` constant already defined in shared package
