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
