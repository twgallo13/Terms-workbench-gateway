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
│   ├── src/components/shell/  # Shell components (sidebar, header, card, etc.)
│   ├── src/components/vendor/ # Vendor-facing UI components
│   ├── src/components/ui/     # Reusable UI primitives (button, empty-state)
│   ├── src/lib/firebase/      # Firebase client + admin SDK init
│   └── src/lib/guards/        # Auth guards (client + server boundary)
├── packages/shared/           # Shared types, enums, models, constants
├── functions/                 # Cloud Functions Gen 2
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

# Copy env example and fill in real values
cp .env.development.example .env.local
# Edit .env.local with real Firebase config from:
#   firebase apps:sdkconfig WEB <app-id> --project twg-dev

# (Optional) For server-side admin SDK:
# 1. Download service account key from Firebase Console
# 2. Save as service-account-key.json (gitignored)
# 3. Add to .env.local: GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json

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

## Phase 0 Status

This is a **Phase 0 scaffold only**. The UI shell and route structure are complete, but no real data fetching, CRUD operations, or workflow logic is implemented.

### What's built
- Full monorepo with 4 workspaces
- 25 styled routes (17 internal + 8 public)
- Internal shell: sidebar, header, breadcrumbs, tabs, cards, status pills
- Vendor shell: review layout, page sections, summary/action areas
- Dashboard with 6 placeholder sections
- Shared types: 25+ enums, 40+ interfaces, constants
- Firebase rules (Firestore + Storage) with default-deny
- Cloud Function: auth trigger for user provisioning
- PDF renderer: Cloud Run placeholder

### What's intentionally deferred
- Firebase Auth sign-in flow
- Real Firestore data fetching
- CRUD operations for all entities
- Quote/agreement workflow logic
- Send/sign/acceptance flow
- Access link issuance and validation
- PDF generation
- WB handoff checklist logic
- Notifications and task assignment
- Audit/activity event triggers
- Role-based access control enforcement
- Search functionality