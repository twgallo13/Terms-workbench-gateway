# Phase 1 Plan — Master Data & Auth Foundation

> Phase 0 tag: `phase-0-scaffold-complete` (commit `104d59a`)
> Status: **planning only — not approved for implementation**

---

## Scope

Phase 1 delivers the foundational data layer: authentication, authorization, and master data CRUD. No transactional workflows (quotes, agreements, signing) are in scope.

### In scope

| Area | Deliverables |
|------|-------------|
| **Auth** | Internal auth guard (Firebase Auth + custom claims), auto-provision for `@shiekhshoes.org`, server-side token verification, `requireInternalUser()` and `requirePermission()` |
| **Sites** | CRUD in Settings → Sites, Firestore rules, seed 3 defaults (Shiekh.com, Karmaloop.com, MLTD.com) |
| **Vendors** | CRUD on `/vendors`, list + detail views, status management |
| **Brands** | CRUD on `/brands`, list + detail views, vendor association |
| **Contacts** | CRUD on `/contacts`, type enum, brand/vendor linking |
| **Fees & Services** | Settings → Fees and Services admin CRUD |
| **Users & Roles** | Settings → Users and Roles, domain allowlist, email allowlist |
| **Firestore rules** | Replace all auth stubs (`isInternalUser`, `isAdmin`, `isOwnerOrAdmin`) with real implementations |

### Out of scope (deferred to Phase 2+)

- Quotes, Agreements, Signing workflows
- Vendor access portal (token validation, external login)
- Document management, WB Handoffs
- Reports/analytics, dashboard real metrics
- Templates, Terms/Clauses, Numbering config
- PDF rendering integration

---

## Dependencies

| Dependency | Required by | Notes |
|-----------|-------------|-------|
| Firebase Auth project config | Auth guard | Needs real Firebase project with Auth enabled |
| Firebase Admin SDK credentials | Server boundary | `FIREBASE_SERVICE_ACCOUNT_KEY` env var |
| Custom claims strategy | RBAC | Cloud Function to set `role` claim on user record |
| Firestore indexes | List queries | Will need composite indexes for filtered/sorted lists |

---

## Build Order

Each step builds on the previous. Test at each gate before proceeding.

### Step 1 — Auth foundation
- Implement `InternalAuthGuard` (subscribe to Firebase Auth state, redirect unauthenticated)
- Implement `requireInternalUser()` server boundary (verify ID token via Admin SDK)
- Wire login page to Firebase Auth (email/password or Google provider)
- Auto-provision users with `@shiekhshoes.org` domain
- Replace Firestore rule stubs: `isInternalUser()` → verify `request.auth != null` + custom claim
- **Gate:** can log in, see dashboard, get rejected from protected routes when unauthenticated

### Step 2 — Sites CRUD (simplest master data)
- Build Settings → Sites admin UI with real Firestore reads/writes
- Establish server action pattern (Next.js server actions or API routes)
- Seed 3 default sites on first run
- Firestore rules: admin-only writes on `sites` collection
- **Gate:** can create, read, update sites in Settings; unauthorized users blocked

### Step 3 — Vendors CRUD
- `/vendors` list with Firestore query, pagination, status filter
- `/vendors/[vendorId]` detail with edit form
- Create vendor flow
- Status transitions (active/inactive/onboarding)
- **Gate:** full vendor lifecycle works

### Step 4 — Brands & Contacts CRUD
- `/brands` list + detail + create, linked to vendor
- `/contacts` list + create, linked to vendor/brand
- Contact type enum selection
- **Gate:** can manage full vendor → brand → contact hierarchy

### Step 5 — Fees, Services, Users & Roles
- Settings → Fees and Services CRUD
- Settings → Users and Roles with domain/email allowlist management
- `requirePermission()` server boundary using role-based lookup
- Firestore rules for RBAC collections
- **Gate:** role-restricted access works end-to-end

---

## Risk Points

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Firestore rule stubs block all writes | P0 — nothing works | Fix rules in Step 1 alongside auth |
| Custom claims require Cloud Function | Auth can't do RBAC without it | Deploy `onUserCreated` trigger early; add `setCustomClaims` callable |
| No real Firebase project configured | Can't test auth at all | Set up Firebase project with Auth + Firestore before starting |
| Composite index limits | List queries may fail | Define indexes in `firebase/firestore.indexes.json` as queries are built |
| Server action vs API route pattern | Inconsistency if not decided early | Decide in Step 2 (Sites) and apply uniformly |

---

## First Implementation Step

**Start with: Step 1 — Auth foundation**

Specifically, the first PR should:
1. Replace the passthrough `InternalAuthGuard` with a real Firebase Auth subscription
2. Implement `requireInternalUser()` using Firebase Admin `verifyIdToken()`
3. Replace `isInternalUser()` in Firestore rules with `request.auth != null`
4. Wire the `/login` page to `signInWithEmailAndPassword` or `signInWithPopup`
5. Test: unauthenticated → redirected to `/login`; authenticated → sees `/dashboard`

This is the critical-path blocker — nothing else in Phase 1 can work without auth.
