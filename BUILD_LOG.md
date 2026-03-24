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
