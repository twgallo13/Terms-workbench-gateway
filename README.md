# Terms Workbench Gateway (TWG)

Vendor onboarding and terms management platform for Shiekh Shoes.

## Tech Stack

- **Frontend:** Next.js 15 (App Router) · React 19 · TypeScript 5.5+
- **Styling:** Tailwind CSS v4 · PostCSS
- **Backend:** Firebase Auth · Cloud Firestore · Cloud Storage · Cloud Functions Gen 2
- **PDF Service:** Cloud Run (Node.js, placeholder)
- **Monorepo:** npm workspaces

## Project Structure

```
├── apps/web/                  # Next.js web application
│   ├── src/app/(internal)/    # Internal admin routes (sidebar shell)
│   ├── src/app/(public)/      # Vendor-facing / login routes
│   ├── src/app/api/auth/      # Session route handler (set/clear cookie)
│   ├── src/components/shell/  # Shell components (sidebar, header, card, etc.)
│   ├── src/components/vendor/ # Vendor-facing UI components
│   ├── src/components/ui/     # Reusable UI primitives (button, empty-state)
│   ├── src/lib/auth/          # Server-side session verification
│   ├── src/lib/firebase/      # Firebase client + admin SDK init
│   ├── src/lib/firestore/     # Typed Firestore CRUD helpers + activity logging
│   └── src/lib/guards/        # Auth guards (client + server boundary)
├── packages/shared/           # Shared types, enums, models, constants
├── functions/                 # Cloud Functions (auth triggers)
├── scripts/                   # Admin scripts (claims backfill, site seeding)
├── services/pdf-renderer/     # Cloud Run PDF service placeholder
└── firebase/                  # Firestore rules, Storage rules, indexes
```

## Getting Started

### Prerequisites

- Node.js 20+ (24 works with warnings)
- npm 9+
- Firebase CLI (`npm install -g firebase-tools`)

### Setup (Codespaces / Local)

```bash
# Clone the repo
git clone https://github.com/twgallo13/Terms-workbench-gateway.git
cd Terms-workbench-gateway

# Install all workspace dependencies
npm install

# Firebase CLI (if not already installed)
npm install -g firebase-tools
firebase login --no-localhost   # for Codespaces (headless)

# Copy env example into the Next.js app directory
cp .env.development.example apps/web/.env.local
# Edit apps/web/.env.local with real Firebase config from:
#   firebase apps:sdkconfig WEB <app-id> --project twg-dev
# Next.js reads .env.local from its own directory (apps/web/), NOT the repo root.

# For server-side admin SDK (required for auth):
# 1. Download service account key from Firebase Console → Project Settings → Service Accounts
# 2. Save as apps/web/service-account-key.json (gitignored)
# 3. Uncomment in apps/web/.env.local: GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json

# Build the shared package
npm run build --workspace=@twg/shared

# Start the dev server
npm run dev --workspace=@twg/web
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Build all workspaces |
| `npm run lint` | Run ESLint across web app |
| `npm run emulators` | Start Firebase emulators (auth, firestore, storage, functions) |

## Auth Architecture

### Session flow
1. User signs in on `/login` via Google (popup) or Email/Password through Firebase Auth client SDK
2. Client obtains an ID token and POSTs it to `/api/auth/session`
3. Server verifies the token via Firebase Admin SDK and sets an httpOnly `__session` cookie (5-day expiry)
4. Internal routes are protected by server-side layout verification (`requireInternalUser()`)
5. Client-side `InternalAuthGuard` handles auth state, claims provisioning race, and logout detection
6. Logout: client calls `DELETE /api/auth/session` to clear cookie, then `signOut()` on Firebase Auth

### Custom claims
Set automatically by `onUserCreated` Cloud Function:
- `theo@shiekhshoes.org`, `theo@shiekh.com` → `{ role: "owner", category: "internal" }`
- `@shiekhshoes.org` domain → `{ role: "member", category: "internal" }`
- All others → `{ role: "member", category: "external" }`

### First-login provisioning
New users may sign in before claims are set by the Cloud Function. The `InternalAuthGuard` retries token refresh up to 5 times (2s apart), showing an "account provisioning" state. If claims never arrive, the user sees a friendly error.

### Backfill existing users
For users created before the Cloud Function was deployed:
```bash
cd apps/web
node ../../scripts/backfill-claims.mjs
```

## Current Status

### What's built
- Full monorepo with 4 workspaces
- 25 styled routes (17 internal + 8 public)
- Internal shell: sidebar, header, breadcrumbs, tabs, cards, status pills
- Vendor shell: review layout, page sections, summary/action areas
- Dashboard with 6 placeholder sections
- Shared types: 25+ enums, 40+ interfaces, constants
- Firebase rules (Firestore + Storage) with default-deny
- **Real Firebase Auth** — Google sign-in and Email/Password, session cookie, server verification
- **Auth guard** — dual-layer (server + client) with claims provisioning race handling
- **Cloud Function** — `onUserCreated` deployed to `twg-dev` (sets claims, creates user doc)
- **Firestore data layer** — typed CRUD helpers with auto-timestamps and activity logging
- **Sites management** — full CRUD with inline create/edit, admin-only writes, real Firestore data
- **Vendors management** — full CRUD with list/detail/create/edit, status filtering, address sub-forms, internal-user writes
- **Firestore rules hardened** — `isInternalUser()` and `isAdmin()` use real custom claims
- **Firestore indexes** — composite index for vendor status filtering
- PDF renderer: Cloud Run placeholder

### What's intentionally deferred
- Brand, Contact CRUD operations
- Quote/agreement workflow logic
- Send/sign/acceptance flow
- Access link issuance and validation
- PDF generation
- WB handoff checklist logic
- Notifications and task assignment
- Audit/activity event triggers
- Role-based access control enforcement
- Search functionality