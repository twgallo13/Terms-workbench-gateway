# Phase 2C — Brands & Contacts

> **Status:** Planning only — not yet approved for implementation  
> **Branch:** `plan/phase-2c-brands-contacts`  
> **Predecessor:** Phase 2B (`phase-2b-vendors-foundation` tag, commit `ab43bbf`)

---

## 1. Scope

Phase 2C delivers **Brands**, **Contacts**, and **BrandContactAssignments** — the next three entities in the Phase 2 dependency chain. Brands and Contacts both depend on Vendors (completed in Phase 2B). BrandContactAssignments link Brands to Contacts.

### In scope

| Capability | Detail |
|---|---|
| **Brand server actions** | `getBrands()`, `getBrand()`, `createBrand()`, `updateBrand()` using existing `lib/firestore` helpers |
| **Brand list page** | `/brands` — real data-driven table replacing placeholder, with status filtering and vendor association |
| **Brand detail page** | `/brands/[brandId]` — display brand fields, edit inline, show associated contacts and site approvals placeholders |
| **Brand create/edit form** | `brandName` (required), `vendorId` (required — vendor picker), `status`, `internalNotes` |
| **Contact server actions** | `getContacts()`, `getContact()`, `createContact()`, `updateContact()` |
| **Contact list page** | `/contacts` — real data-driven table replacing placeholder, filterable by vendor and status |
| **Contact detail page** | `/contacts/[contactId]` — display all fields, edit inline |
| **Contact create/edit form** | `firstName`, `lastName` (required), `email` (required), `phone`, `title`, `contactType`, `vendorId` (required), `status`, `isPrimary` |
| **BrandContactAssignment actions** | `assignContactToBrand()`, `removeContactFromBrand()`, `getBrandContacts()`, `getContactBrands()` |
| **Brand → Contacts tab** | On brand detail page, list assigned contacts with ability to assign/unassign |
| **Vendor → Brands tab** | On vendor detail page, replace placeholder with real brand list for that vendor |
| **Vendor → Contacts tab** | On vendor detail page, replace placeholder with real contact list for that vendor |
| **Activity logging** | Write `activityLogs` entries on every Brand and Contact create/update, and on assignment changes |
| **Internal-user write access** | All internal users can create/edit brands, contacts, and assignments (same as Vendors) |

### Out of scope (deferred)

- SiteApprovals (Phase 2D — depends on Brands + Sites)
- Contact search, saved views, advanced filtering
- Brand/Contact deletion (soft-delete pattern deferred)
- Brand logo/image uploads
- Contact import/export

---

## 2. Dependency Order

```
Phase 2A (completed)
  Sites ✅
  Data layer helpers ✅
  Firestore rules ✅
    ↓
Phase 2B (completed)
  Vendors ✅
    ↓
Phase 2C (this plan)
  Brands (depends on Vendors — needs vendorId FK)
  Contacts (depends on Vendors — needs vendorId FK)
  BrandContactAssignments (depends on Brands + Contacts)
    ↓
Phase 2D (future)
  SiteApprovals (depends on Brands + Sites)
```

**Brands depend on Vendors** for the `vendorId` foreign key and vendor picker.  
**Contacts depend on Vendors** for the `vendorId` foreign key.  
**BrandContactAssignments depend on both Brands and Contacts.**

Build order within Phase 2C:
1. Brands first (simpler model, fewer fields)
2. Contacts second (more fields, contactType enum)
3. BrandContactAssignments last (join entity, depends on both)

---

## 3. Build Sequence

### Step 1 — Brand server actions + list page

1. Create `apps/web/src/app/(internal)/brands/actions.ts`
2. Implement `getBrands(statusFilter?, vendorId?)` — list with optional filters, ordered by `brandName`
3. Implement `getBrand(id)` — single document fetch
4. Implement `createBrand(formData)` — validate required fields (`brandName`, `vendorId`), verify vendor exists, create document, log activity
5. Implement `updateBrand(id, formData)` — validate, update, log activity
6. Replace placeholder `/brands` page with real server component
7. Create `brands-table.tsx` — client table with status filter, inline create/edit
8. Table columns: Brand Name (linked), Vendor (name resolved), Status, Created, Actions

### Step 2 — Brand form + vendor picker

1. Create `apps/web/src/app/(internal)/brands/brand-form.tsx`
2. Fields: `brandName` (required), `vendorId` (required — select from vendors), `status` (select from BrandStatus), `internalNotes` (textarea)
3. Vendor picker: fetch active vendors via `getVendors()`, render as `<select>` with vendor `legalCompanyName` labels
4. Use `useActionState` pattern (same as Vendors/Sites)
5. Server-side validation: `brandName` required, `vendorId` must reference an existing vendor

### Step 3 — Brand detail page

1. Replace placeholder `apps/web/src/app/(internal)/brands/[brandId]/page.tsx`
2. Server component: fetch brand via `getBrand(id)`, resolve vendor name, 404 if not found
3. Tabs: Overview (inline edit), Contacts (BrandContactAssignments — Step 6), Site Approvals (placeholder for Phase 2D), Activity (placeholder)
4. Create `brand-detail-client.tsx` for overview tab with edit toggle

### Step 4 — Contact server actions + list page

1. Create `apps/web/src/app/(internal)/contacts/actions.ts`
2. Implement `getContacts(vendorId?, statusFilter?)` — list with optional filters, ordered by `lastName, firstName`
3. Implement `getContact(id)` — single document fetch
4. Implement `createContact(formData)` — validate required fields (`firstName`, `lastName`, `email`, `vendorId`), verify vendor exists, create document, log activity
5. Implement `updateContact(id, formData)` — validate, update, log activity
6. Replace placeholder `/contacts` page with real server component
7. Create `contacts-table.tsx` — client table with vendor filter, status filter, inline create/edit
8. Table columns: Name (linked), Email, Vendor (name resolved), Type, Status, Primary?, Actions

### Step 5 — Contact form + detail page

1. Create `apps/web/src/app/(internal)/contacts/contact-form.tsx`
2. Fields: `firstName` (required), `lastName` (required), `email` (required), `phone`, `title`, `contactType` (select from ContactType), `vendorId` (required — vendor picker), `status`, `isPrimary` (checkbox)
3. Create `apps/web/src/app/(internal)/contacts/[contactId]/page.tsx` — server component detail page
4. Create `contact-detail-client.tsx` for overview tab
5. Tabs: Overview (inline edit), Brand Assignments (Step 6), Activity (placeholder)

### Step 6 — BrandContactAssignments

1. Create `apps/web/src/app/(internal)/brands/assignment-actions.ts`
2. Implement `getBrandContacts(brandId)` — list assignments + resolve contact names
3. Implement `assignContactToBrand(brandId, contactId, contactType, isPrimary)` — create assignment, log activity
4. Implement `removeContactFromBrand(assignmentId)` — delete assignment, log activity
5. Implement `getContactBrands(contactId)` — list assignments for a contact
6. Wire into Brand detail page Contacts tab — list contacts, add/remove buttons
7. Wire into Contact detail page Brand Assignments tab

### Step 7 — Vendor detail page integration

1. Update vendor detail page Brands tab — fetch and display brands for `vendorId`
2. Update vendor detail page Contacts tab — fetch and display contacts for `vendorId`
3. Link brand/contact names to their detail pages

### Step 8 — Composite indexes

Likely needed:
- `brands(vendorId ASC, brandName ASC)` — for vendor-scoped brand lists
- `brands(status ASC, brandName ASC)` — for status filter + ordering
- `contacts(vendorId ASC, lastName ASC)` — for vendor-scoped contact lists
- `contacts(status ASC, lastName ASC)` — for status filter + ordering
- `brandContactAssignments(brandId ASC, contactType ASC)` — for brand contact lists

Deploy indexes to twg-dev after triggering them during development.

### Step 9 — Verification

1. Create brand via UI → confirm persists in Firestore with vendorId FK
2. Edit brand → confirm fields update
3. Create contact via UI → confirm persists with vendorId FK
4. Edit contact → confirm fields update
5. Assign contact to brand → confirm BrandContactAssignment created
6. Remove contact from brand → confirm assignment deleted
7. Vendor detail → Brands tab shows real data
8. Vendor detail → Contacts tab shows real data
9. Verify activity log entries for all operations
10. Verify status filters on both list pages
11. Build passes with no type errors

---

## 4. Risk Points

| Risk | Impact | Mitigation |
|---|---|---|
| **Vendor picker data loading** | Brand/Contact forms need a vendor list for the `vendorId` select; passing server data to client forms requires care | Fetch vendors in server component, pass as prop to client form; or use a dedicated `getVendorsForPicker()` that returns `{id, legalCompanyName}[]` |
| **Vendor name resolution on list pages** | Brand/Contact tables show vendor name, not vendorId; fetching N vendors for N rows is expensive | Option A: denormalize vendor name into Brand/Contact docs (adds staleness risk). Option B: batch-fetch unique vendorIds after list query. **Prefer Option B** to avoid schema drift. |
| **BrandContactAssignment as join entity** | Three-collection join (Brands ↔ Assignments ↔ Contacts) adds query complexity | Keep assignment queries simple: filter by `brandId` or `contactId` only, resolve names client-side with parallel fetches |
| **ContactType enum on assignments** | A contact can be "Primary" for the vendor but "Legal" for a specific brand — assignment-level `contactType` overrides contact-level | Make assignment `contactType` independent of contact's own `contactType`; UI should show both clearly |
| **isPrimary enforcement** | Multiple contacts could be marked `isPrimary` for the same vendor or brand | For 2C, allow it and add uniqueness enforcement in a future phase if needed |
| **Composite indexes** | Multiple new queries with `where + orderBy` will need indexes | Deploy indexes incrementally during development; commit all to `firestore.indexes.json` |
| **Firestore rules already correct** | `brands`, `contacts`, `brandContactAssignments` all have `write: isInternalUser()` | No rule changes needed — verify at runtime |

---

## 5. First Implementation Step

**Start with Brand server actions + list page + form.**

Concrete first PR deliverables (Brands only):

1. `apps/web/src/app/(internal)/brands/actions.ts` — `getBrands`, `getBrand`, `createBrand`, `updateBrand`
2. `apps/web/src/app/(internal)/brands/page.tsx` — server component list page
3. `apps/web/src/app/(internal)/brands/brands-table.tsx` — client table with status filter, vendor column
4. `apps/web/src/app/(internal)/brands/brand-form.tsx` — validated form with vendor picker
5. `apps/web/src/app/(internal)/brands/[brandId]/page.tsx` — brand detail page (replace placeholder)
6. `apps/web/src/app/(internal)/brands/[brandId]/brand-detail-client.tsx` — overview tab with edit
7. Composite index for brands if needed

Second PR deliverables (Contacts + Assignments):

1. Contact actions, list page, form, detail page
2. BrandContactAssignment actions
3. Brand detail Contacts tab wired
4. Vendor detail Brands/Contacts tabs wired
5. All composite indexes

### Existing infrastructure reused (no changes needed)

- `lib/firestore/helpers.ts` — `createDocument<Brand>`, `updateDocument`, `listDocuments<Brand>`, `getDocument<Brand>`, `logActivity`
- `lib/firestore/index.ts` — already exports all needed helpers
- `packages/shared/src/models/vendors.ts` — `Brand`, `Contact`, `BrandContactAssignment` types already defined
- `packages/shared/src/enums/index.ts` — `BrandStatus`, `ContactStatus`, `ContactType` enums already defined
- `firebase/firestore.rules` — brands/contacts/brandContactAssignments write rules already set to `isInternalUser()`
- `COLLECTIONS.brands`, `COLLECTIONS.contacts`, `COLLECTIONS.brandContactAssignments` constants already defined
- Vendor server actions (`getVendors`, `getVendor`) — reused for vendor picker and name resolution
