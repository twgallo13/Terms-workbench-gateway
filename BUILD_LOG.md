# BUILD_LOG.md

## 2026-03-24 — Phase 0 Web Rebuild (Path B)

**Branch:** `feat/phase-0-web-rebuild`
**Source:** Selective migration from `backup/phase-0-checkpoint-20260324`

### What was done

1. **Created feature branch from main** with clean toolchain:
   - Tailwind CSS v4 + `@tailwindcss/postcss`
   - ESLint flat config (`next/core-web-vitals` + `next/typescript`)
   - Prettier with `prettier-plugin-tailwindcss`
   - `lucide-react` icons, `clsx` utility
   - `globals.css` with Tailwind import and design tokens

2. **Migrated unchanged from backup:**
   - `packages/shared/` — enums (25+), models (40+ interfaces), constants, seed data
   - `functions/` — Cloud Functions Gen 2 entry, auth trigger
   - `firebase/` — Firestore rules, Storage rules, indexes placeholder
   - `services/pdf-renderer/` — Cloud Run placeholder with Dockerfile
   - Root configs — `package.json`, `tsconfig.base.json`, `.gitignore`, `.firebaserc`, `firebase.json`
   - Env example files — `.env.example`, `.env.development.example`, `.env.staging.example`, `.env.production.example`
   - Web app infra — `lib/firebase/` (client + admin SDK), `lib/guards/` (auth guards + server boundary)

3. **Rebuilt fresh (Tailwind, no inline styles):**
   - Internal shell: Sidebar, TopHeader, Breadcrumbs, PageHeader, Card/CardHeader, StatusPill, TabShell, RightRail, FooterActionBar, AppShell
   - Vendor shell: VendorReviewLayout, VendorPageShell, VendorSummaryAction
   - UI primitives: Button (4 variants), EmptyState
   - 17 internal routes with styled table/card/tab compositions
   - 8 public/vendor routes with mobile-friendly layout
   - Dashboard with 6 business-facing sections (Action Required, My Queue, Team Queue, Snapshot Metrics, Alerts & Exceptions, Recent Activity)

4. **Fixed ESLint errors** in migrated Firebase lib files (`let` → `const`, removed unused import)

### What's intentionally deferred (marked with TODO)

- Firebase Auth sign-in flow
- Real Firestore data fetching (all routes show placeholder data)
- CRUD operations for all entities
- Quote/agreement creation, versioning, send/sign workflow
- Access link issuance, validation, and revocation
- PDF generation via pdf-renderer service
- WB handoff checklist logic
- Notification delivery and task assignment
- Audit/activity event triggers
- Role-based access control enforcement
- Search functionality
- Responsive sidebar collapse for mobile
- Middle click / right-click behavior on nav links

### Build verification

- `npm run build` passes with 0 errors
- All 25 routes compile successfully (17 static + 8 dynamic)
- Shared package compiles clean via `tsc`

---

## 2026-03-24 — Phase 1A: Firebase Bootstrap

**Branch:** `feat/phase-1-firebase-bootstrap`

### What was done

1. **Created real Firebase dev project**
   - Project ID: `twg-dev`
   - Display name: TWG Dev
   - Console: https://console.firebase.google.com/project/twg-dev/overview

2. **Enabled Firebase services**
   - Cloud Firestore (database created, location: `nam5` / US multi-region)
   - Firebase Authentication (Identity Toolkit API enabled)
   - Cloud Storage (Firebase + backing storage APIs enabled)

3. **Registered web app**
   - App: "TWG Web" (ID: `1:192374801010:web:8d4ec4e4cd168ed95b78eb`)
   - Config obtained and saved to `apps/web/.env.local` (gitignored)

4. **Updated environment config**
   - `.env.development.example` updated with real project shape
   - `.env.example` updated with Admin SDK auth options
   - `.gitignore` updated with service account key patterns
   - `apps/web/.env.local` created locally with real config (not committed)
   - Note: Next.js reads `.env.local` from its own CWD (`apps/web/`), not the repo root

5. **Documented auth strategy** (`docs/FIREBASE_AUTH_STRATEGY.md`)
   - Custom claims: `role` (owner/admin/member) + `category` (internal/external)
   - Owner bootstrap for `theo@shiekhshoes.org` and `theo@shiekh.com`
   - Domain allowlist enforcement via `onUserCreated` Cloud Function
   - Admin SDK initialization via Application Default Credentials
   - Firestore rule replacement plan

### Manual steps completed by owner

- Upgraded to Blaze (pay-as-you-go) plan
- Enabled Email/Password auth provider in Firebase Console
- Enabled Google auth provider in Firebase Console

### What remains deferred

- Service account key download (manual step for owner)
- Verify Google Auth authorized domains for Codespaces
- Deploy Firestore security rules to live project
- Deploy `onUserCreated` Cloud Function
- Implement actual `InternalAuthGuard` auth subscription
- Implement `requireInternalUser()` server verification
- Full RBAC permission lookup

### Values the user must supply manually

- **Service account key:** Download from Firebase Console → Project Settings → Service Accounts → Generate New Private Key → save as `service-account-key.json`
- **Auth provider:** Enable Email/Password in Firebase Console → Authentication → Sign-in method

---

## 2026-03-24 — Phase 1B: Internal Auth Implementation

**Branch:** `feat/phase-1b-internal-auth`

### What was done

1. **Login page** (`apps/web/src/app/(public)/login/page.tsx`)
   - Email/Password sign-in via Firebase Auth client SDK
   - Loading state, friendly error messages for all Firebase error codes
   - Error banners for unauthorized and provisioning failures (via URL params)

2. **Session route handler** (`apps/web/src/app/api/auth/session/route.ts`)
   - `POST` — verifies Firebase ID token, creates httpOnly `__session` cookie (5-day expiry)
   - `DELETE` — clears session cookie (logout)
   - Cookie: httpOnly, secure in production, sameSite=lax

3. **Server-side session verification** (`apps/web/src/lib/auth/session.ts`)
   - `getSessionUser()` — reads `__session` cookie, verifies via `adminAuth.verifySessionCookie()`
   - `requireInternalUser()` — redirects to `/login` if unauthenticated, blocks external category

4. **Admin SDK** (`apps/web/src/lib/firebase/admin.ts`)
   - Loads service account key from `GOOGLE_APPLICATION_CREDENTIALS` relative path
   - Falls back to ADC for GCP environments

5. **Internal auth guard** (`apps/web/src/lib/guards/internal-auth-guard.tsx`)
   - Client-side `onAuthStateChanged` subscription
   - Claims provisioning race: retries `getIdTokenResult(true)` up to 5× at 2s intervals
   - Displays "Setting up your account…" during provisioning
   - Redirects external or unauthenticated users to `/login`

6. **Internal layout** — server calls `requireInternalUser()` before render

7. **Logout** — header button calls `DELETE /api/auth/session` + `signOut(auth)`

8. **Cloud Function** (`onUserCreated` v1 auth trigger)
   - Sets custom claims `{ role, category }` based on seed constants
   - Creates Firestore user doc in `users` collection
   - Deployed to `twg-dev` (us-central1)

9. **Backfill script** (`scripts/backfill-claims.mjs`)
   - Sets claims for users created before function deploy
   - Usage: `cd apps/web && node ../../scripts/backfill-claims.mjs`

### Auth/session approach

```
Client → signInWithEmailAndPassword → getIdToken
       → POST /api/auth/session { idToken }
Server → verifyIdToken → createSessionCookie → Set-Cookie: __session (httpOnly, 5 days)
Internal layout (server) → requireInternalUser() → verifySessionCookie → redirect if invalid
InternalAuthGuard (client) → onAuthStateChanged → check claims → retry if provisioning
```

### Verification results

| Test | Result |
|------|--------|
| GET /dashboard (no cookie) → 307 redirect to /login | ✅ |
| GET /login → 200 OK | ✅ |
| GET /vendor-access/test-token → 200 (no auth) | ✅ |
| POST /api/auth/session (no token) → 400 rejected | ✅ |
| onUserCreated function deployed and active | ✅ |
| No secrets in committed files | ✅ |
| npm run build passes (all workspaces) | ✅ |

### First test user setup

1. Go to Firebase Console → Authentication → Users → Add user
2. Enter `theo@shiekhshoes.org` with a password
3. `onUserCreated` will set `{ role: "owner", category: "internal" }` automatically
4. Sign in at `/login` with those credentials

---

## 2026-03-24 — Phase 2A: Data Layer & Sites Foundation

**Branch:** `feat/phase-2a-data-layer-sites`

### What was done

1. **Typed Firestore data layer** (`apps/web/src/lib/firestore/`)
   - `helpers.ts` — generic CRUD helpers: `getDocument<T>`, `listDocuments<T>`, `createDocument<T>`, `updateDocument`, `deleteDocument`
   - Auto-stamps `createdAt`/`updatedAt`/`createdBy`/`updatedBy` on writes
   - `logActivity()` — writes audit entries to `activityLogs` collection
   - Typed query support: `QueryFilter` (where clauses), `QueryOrder` (orderBy)
   - Barrel export via `index.ts`

2. **Sites CRUD** (server actions pattern)
   - `actions.ts` — `getSites()`, `getSite()`, `createSite()`, `updateSite()`
   - Server-side validation for required fields (name, displayLabel, domain)
   - Admin-only write enforcement (`role === "owner"`)
   - Activity logging on every create/update
   - `revalidatePath` for automatic cache invalidation

3. **Sites UI**
   - `page.tsx` — server component that fetches real Firestore data
   - `sites-table.tsx` — client component with inline create/edit, empty state, loading
   - `site-form.tsx` — validated form with `useActionState`, error display, pending state
   - Added "Sites" to sidebar navigation (Globe icon)
   - Added "Sites" to breadcrumbs label map

4. **Firestore rules hardened**
   - `isInternalUser()` → `request.auth.token.category == "internal"`
   - `isAdmin()` → `isInternalUser() && request.auth.token.role == "owner"`
   - Deployed to `twg-dev`

5. **Seed script** (`scripts/seed-sites.mjs`)
   - Seeds Shiekh.com, Karmaloop.com, MLTD.com
   - Idempotent (skips existing sites by domain)
   - Executed successfully against `twg-dev`

### Architecture decisions

- **Server actions** over API route handlers — cleaner integration with Next.js 15 App Router forms
- **Inline editing** over separate detail pages — Sites are simple entities, inline edit in the table is more efficient
- **Data layer in `lib/firestore/`** — shared helpers reusable by Vendors, Brands, Contacts in Phase 2B+
- **Admin SDK on server only** — all Firestore operations go through Admin SDK via server actions, never client-side

### Verification results

| Test | Result |
|------|--------|
| GET /sites (no auth) → 307 redirect to /login | ✅ |
| GET /sites (authenticated) → 200 with real data | ✅ |
| Sites page shows Shiekh.com, Karmaloop.com, MLTD.com | ✅ |
| `npm run build` passes | ✅ |
| Seed script idempotent (re-run skips existing) | ✅ |
| Firestore rules deployed with claim checks | ✅ |
| No secrets committed | ✅ |

---

## 2026-03-24 — Phase 2B: Vendors Foundation

**Branch:** `feat/phase-2b-vendors-foundation`

### What was done

1. **Vendor server actions** (`apps/web/src/app/(internal)/vendors/actions.ts`)
   - `getVendors(statusFilter?)` — list with optional status filter, ordered by `legalCompanyName`
   - `getVendor(id)` — single document fetch
   - `createVendor(formData)` — validate required fields, create document, log activity
   - `updateVendor(id, formData)` — validate, update, log activity
   - Write access: `requireInternalUser()` (all internal users, not admin-only)
   - Dot-notation `FormData` parsing for nested `Address` objects

2. **Vendor list page** (`/vendors`)
   - Server component fetching real Firestore data via `getVendors()`
   - Client table with inline create/edit (same pattern as Sites)
   - Status filter dropdown (All / Active / Inactive / Suspended / Archived)
   - Columns: Legal Name (linked to detail), DBA, Status, Website, Created
   - Empty state with call-to-action

3. **Vendor detail page** (`/vendors/[vendorId]`)
   - Server component: fetches real vendor data, returns 404 if not found
   - TabShell with Overview (editable), Company Info, Brands (placeholder), Contacts (placeholder), Activity (placeholder)
   - Overview tab: inline edit toggle with full VendorForm
   - Company Info tab: read-only field display + address rendering
   - Internal notes section (shown when present)

4. **Vendor form** (`vendor-form.tsx`)
   - Fields: legalCompanyName (required), dba, taxId, website, status (select), internalNotes (textarea)
   - Address sub-forms for businessAddress and returnAddress (line1, line2, city, state, postalCode, country)
   - `useActionState` pattern, error display, pending state

5. **Firestore indexes**
   - Added composite index: `vendors(status ASC, legalCompanyName ASC)` for status filter queries
   - Deployed to `twg-dev`

### Architecture decisions

- **Internal-user writes** (not admin-only like Sites) — per PHASE_2B_PLAN.md, all internal users can manage vendors
- **Dot-notation address parsing** — addresses serialized as `businessAddress.line1`, etc. in FormData, parsed server-side
- **Reused existing data layer** — zero changes to `lib/firestore/helpers.ts`
- **No new shared model fields** — all fields from `packages/shared/src/models/vendors.ts` used as-is

### Verification results

| Test | Result |
|------|--------|
| Vendor create (all fields + nested address) | ✅ |
| Vendor read back (all fields correct) | ✅ |
| Vendor update (status change, address add) | ✅ |
| Activity log written and verified | ✅ |
| Vendor list ordered by legalCompanyName | ✅ |
| Status filter query works | ✅ |
| Firestore rules: vendor write = isInternalUser() | ✅ |
| Firestore rules: vendor read = isAuthenticated() | ✅ |
| Server action uses requireInternalUser() (not admin) | ✅ |
| `npm run build` passes | ✅ |
| No secrets committed | ✅ |

---

## Google Sign-In (feat/google-sign-in)

**Date:** 2026-03-25
**Branch:** `feat/google-sign-in`

### Scope

Added Google sign-in to the internal admin `/login` page alongside the existing Email/Password flow. No changes to vendor routes, session architecture, or auth guards.

### Changes

| File | Change |
|------|--------|
| `apps/web/src/app/(auth)/login/page.tsx` | Added "Continue with Google" button using `signInWithPopup` + `GoogleAuthProvider`; extracted shared `createSessionAndRedirect` helper; added popup-related error messages; both sign-in methods disabled while either is in progress |
| `README.md` | Updated session flow description, auth feature list, removed Google sign-in from deferred list |
| `BUILD_LOG.md` | Added this section |

### How it works

1. User clicks "Continue with Google" → Firebase `signInWithPopup(auth, googleProvider)`
2. On success, `user.getIdToken()` obtains the ID token (includes custom claims)
3. ID token POSTed to `POST /api/auth/session` → same httpOnly `__session` cookie flow as Email/Password
4. Redirect to `/dashboard`
5. Internal auth guards (`requireInternalUser` server-side, `InternalAuthGuard` client-side) enforce `category: "internal"` — same as before
6. External Google users are blocked by existing rules (no code change needed)

### Verification results

| Test | Result |
|------|--------|
| `/login` returns 200, contains "Continue with Google" button | ✅ |
| `/login` contains Google logo SVG | ✅ |
| `/login` still contains Email/Password "Sign In" form | ✅ |
| Google user (theo@shiekhshoes.org) session creation | ✅ |
| Google user reaches /dashboard (200) | ✅ |
| No provisioning error for Google user | ✅ |
| Email user (theo@shiekh.com) session flow still works | ✅ |
| Email user reaches /dashboard (200) | ✅ |
| Vendor routes untouched (/vendor-access returns 200) | ✅ |
| `next build` passes | ✅ |

---

## Phase 2C — Brands & Contacts Foundation (feat/phase-2c-brands-contacts)

**Date:** 2026-03-25
**Branch:** `feat/phase-2c-brands-contacts`

### Scope

Deliver Brands, Contacts, and BrandContactAssignments — the master-data foundation on top of the existing auth and typed Firestore layer. No Site Approvals, Quotes, Agreements, or workflow logic.

### Changes

| File | Change |
|------|--------|
| `brands/actions.ts` | `getBrands`, `getBrand`, `createBrand`, `updateBrand`, `getVendorsForPicker` server actions |
| `brands/brand-form.tsx` | Brand form with vendor picker, status select, internal notes |
| `brands/brands-table.tsx` | Brand list table with status filter, vendor name resolution, inline create/edit |
| `brands/page.tsx` | Replaced placeholder with real server component list page |
| `brands/[brandId]/page.tsx` | Brand detail with overview, contacts tab, site approvals placeholder, activity placeholder |
| `brands/[brandId]/brand-detail-client.tsx` | Overview tab with edit toggle |
| `brands/[brandId]/brand-contacts-tab.tsx` | Assign/remove contacts to brand, role + primary flag |
| `brands/assignment-actions.ts` | `assignContactToBrand`, `removeContactFromBrand`, `getBrandContacts`, `getContactBrands` |
| `contacts/actions.ts` | `getContacts`, `getContact`, `createContact`, `updateContact` server actions |
| `contacts/contact-form.tsx` | Contact form with all fields, vendor picker, type select, isPrimary checkbox |
| `contacts/contacts-table.tsx` | Contact list table with status filter, vendor column, inline create/edit |
| `contacts/page.tsx` | Replaced placeholder with real server component list page |
| `contacts/[contactId]/page.tsx` | Contact detail with overview, brand assignments tab, activity placeholder |
| `contacts/[contactId]/contact-detail-client.tsx` | Overview tab with edit toggle |
| `contacts/[contactId]/contact-brands-tab.tsx` | Shows brands assigned to this contact |
| `vendors/[vendorId]/page.tsx` | Replaced placeholder Brands/Contacts tabs with real data |
| `vendors/[vendorId]/vendor-brands-tab.tsx` | Fetches brands by vendorId |
| `vendors/[vendorId]/vendor-contacts-tab.tsx` | Fetches contacts by vendorId |
| `firebase/firestore.indexes.json` | Added 5 composite indexes for brands, contacts, assignments |
| `README.md` | Updated feature list, removed Brands/Contacts from deferred |
| `BUILD_LOG.md` | Added this section |

### Data approach

- Reuses existing `@twg/shared` models: `Brand`, `Contact`, `BrandContactAssignment`
- Reuses existing enums: `BrandStatus`, `ContactStatus`, `ContactType`
- Reuses existing Firestore helpers: `createDocument`, `updateDocument`, `listDocuments`, `getDocument`, `deleteDocument`, `logActivity`
- Vendor name resolution via batch lookup (Option B from plan — no denormalization)
- All server actions use `requireInternalUser()` for auth

### Firestore rules

No changes needed — brands, contacts, and brandContactAssignments rules were already set to `write: isInternalUser()` and `read: isAuthenticated()` in Phase 2A.

### Verification results

| Test | Result |
|------|--------|
| `next build` passes with no type errors | ✅ |
| All routes render: /brands, /brands/[id], /contacts, /contacts/[id] | ✅ |
| No secrets committed | ✅ |
| No new ESLint warnings introduced | ✅ |
| Firestore indexes file valid JSON | ✅ |
| Vendor detail Brands/Contacts tabs wired to real data | ✅ |
