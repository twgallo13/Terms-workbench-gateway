# Phase 2D — Site Approvals

> Planning only. Do not implement until approved.

## Scope

Site Approvals links **brands** to **sites** with an approval status (`approved | pending | revoked`). Each brand can be approved for different sites independently. Internal admins manage approvals; vendors view them read-only.

### What Phase 2D delivers

| Deliverable | Description |
|---|---|
| SiteApproval server actions | CRUD in `brands/site-approval-actions.ts` — create, update (status change), list by brand, list by site, revoke |
| Brand detail "Site Approvals" tab | Replace placeholder in `brands/[brandId]/page.tsx` with real `BrandSiteApprovalsTab` component |
| Site picker | Reusable site selector sourced from the existing `sites` collection (Phase 2A) |
| Activity logging | Log `site_approval_created`, `site_approval_updated`, `site_approval_revoked` events |
| Composite indexes | `siteApprovals` → `brandId + status`, `siteId + status` |
| Vendor-facing read view | Read-only approved-sites list on vendor brand detail (future portal prep) |

### What Phase 2D does NOT deliver

- Quotes or Agreements (Phase 3)
- Vendor portal / external login (Phase 4+)
- Approval workflow automation or notifications
- Bulk approval operations

## Dependencies

| Dependency | Status | Notes |
|---|---|---|
| `SiteApproval` interface | ✅ Ready | `packages/shared/src/models/sites.ts` — already defined with `brandId`, `siteId`, `status`, audit fields |
| `SiteApprovalStatus` enum | ✅ Ready | `packages/shared/src/enums/index.ts` — `approved`, `pending`, `revoked` |
| `siteApprovals` collection constant | ✅ Ready | `packages/shared/src/constants/index.ts` |
| Firestore security rules | ✅ Ready | `read: isAuthenticated()`, `write: isInternalUser()` |
| Sites CRUD (Phase 2A) | ✅ Complete | Full site management with seed data (Shiekh, Karmaloop, MLTD) |
| Brands CRUD (Phase 2C) | ✅ Complete | Brand detail page has placeholder tab ready for replacement |
| Firestore helpers | ✅ Ready | `getDocument`, `listDocuments`, `createDocument`, `updateDocument`, `deleteDocument`, `logActivity` |
| `requireInternalUser()` | ✅ Ready | Auth guard used by all server actions |

**Zero new shared-package changes needed** — all models, enums, and constants already exist.

## Build Sequence

### Commit 1 — Server actions (`brands/site-approval-actions.ts`)

```
createSiteApproval(formData)    — validates brandId+siteId, checks for duplicate, creates with status "pending"
updateSiteApprovalStatus(id, newStatus)  — transitions status, logs activity
getSiteApproval(id)             — single doc read
getSiteApprovalsByBrand(brandId, statusFilter?) — list with optional filter
getSiteApprovalsBySite(siteId, statusFilter?)   — list with optional filter
revokeSiteApproval(id)          — sets status to "revoked", stamps revokedAt/revokedBy
```

Pattern: mirror `brands/actions.ts` and `brands/assignment-actions.ts`.

### Commit 2 — Brand detail Site Approvals tab

- `brands/[brandId]/brand-site-approvals-tab.tsx` — client component
- Displays approved/pending/revoked approvals in a table
- "Add Site Approval" button opens inline form with site picker + status select
- Status change via dropdown or action button
- Revoke button with confirmation
- Replace placeholder content in `brands/[brandId]/page.tsx`

### Commit 3 — Site picker component

- `brands/site-approval-form.tsx` — reusable form
- `getSitesForPicker()` server action (similar to `getVendorsForPicker()`)
- Fetches active sites from `sites` collection
- Prevents duplicate brand+site combinations

### Commit 4 — Composite indexes

Add to `firebase/firestore.indexes.json`:
- `siteApprovals`: `brandId` ASC + `status` ASC
- `siteApprovals`: `siteId` ASC + `status` ASC

Deploy via `firebase deploy --only firestore:indexes`.

### Commit 5 — Docs update

- Update `BUILD_LOG.md` with Phase 2D entry
- Update `README.md` phase checklist

## Risk Points

| Risk | Impact | Mitigation |
|---|---|---|
| **Duplicate approvals** | Brand approved twice for same site | Enforce uniqueness check in `createSiteApproval` — query `siteApprovals` where `brandId == X && siteId == Y && status != revoked` before creating |
| **Orphaned approvals** | Brand or site deleted while approvals exist | Phase 2D does not add delete for brands/sites; defer cascade logic to Phase 3 when quotes reference approvals |
| **Status transitions** | Invalid transitions (e.g., revoked → approved) | Validate allowed transitions: `pending → approved`, `pending → revoked`, `approved → revoked`. Re-approval = new record |
| **Quote dependency** | Quotes reference `siteApprovalIds[]` — must exist before Phase 3 | Phase 2D creates the approvals; Phase 3 will reference them by ID |
| **Index deployment** | Composite indexes take minutes to build | Deploy indexes first, verify in Firebase console before testing |

## First Implementation Step

**Create branch `feat/phase-2d-site-approvals` from `main` (tag `phase-2c-brands-contacts`)**, then implement Commit 1: `brands/site-approval-actions.ts` with all six server actions, following the exact patterns from `brands/actions.ts` and `brands/assignment-actions.ts`. Verify with a Firestore test script similar to the Phase 2C verification approach.

## Estimated File Count

| Type | Files | Notes |
|---|---|---|
| Server actions | 1 | `site-approval-actions.ts` |
| Components | 2 | `brand-site-approvals-tab.tsx`, `site-approval-form.tsx` |
| Modified pages | 1 | `brands/[brandId]/page.tsx` (replace placeholder) |
| Indexes | 1 | `firestore.indexes.json` (add 2 entries) |
| Docs | 2 | `BUILD_LOG.md`, `README.md` |
| **Total** | **~7 files** | +4 new, ~3 modified |
