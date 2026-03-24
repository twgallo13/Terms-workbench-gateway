# Firebase Auth & Custom Claims Strategy

> Phase 1A planning artifact — documents decisions for auth implementation.

---

## Custom Claims Structure

Firebase Auth custom claims are set on the user token and available in both
client-side code and Firestore security rules via `request.auth.token`.

```json
{
  "role": "owner" | "admin" | "member",
  "category": "internal" | "external" | "system"
}
```

### Role definitions

| Claim value | Purpose | Permissions |
|-------------|---------|-------------|
| `owner`     | Theo + designated principals | Full access, user management, system config |
| `admin`     | Internal admins | CRUD on all master data and transactions |
| `member`    | Standard internal users | Read all, write within assigned scope |

### How claims are set

1. **On user creation** — the existing `onUserCreated` Cloud Function trigger
   checks the user's email:
   - If email is in `SEED_ADMIN_EMAILS` → set `{ role: "owner", category: "internal" }`
   - If email domain is in `SEED_INTERNAL_DOMAINS` → set `{ role: "member", category: "internal" }`
   - Otherwise → set `{ role: "member", category: "external" }`

2. **On role change** — a callable Cloud Function `setUserClaims` allows
   owners to update claims for other users.

3. **Domain/email allowlist** — Firestore collections `domainAllowlist` and
   `emailAllowlist` are checked during user creation to determine auto-role
   assignment beyond the seed constants.

---

## Owner/Admin Bootstrap Path

### Bootstrap accounts

| Email | Initial role | Notes |
|-------|-------------|-------|
| `theo@shiekhshoes.org` | `owner` | Primary admin, auto-provisioned |
| `theo@shiekh.com` | `owner` | Secondary admin, auto-provisioned |

### Bootstrap sequence

1. Deploy the `onUserCreated` Cloud Function to the `twg-dev` project
2. Enable Email/Password auth provider in Firebase Console
3. First login by `theo@shiekhshoes.org` triggers `onUserCreated`
4. Function detects email in `SEED_ADMIN_EMAILS`, sets `owner` claim
5. User's token refreshes, `InternalAuthGuard` sees `role: "owner"`
6. User has full access to all internal routes

### Manual bootstrap fallback

If the Cloud Function is not yet deployed, an owner can set claims manually:

```bash
# Using Firebase Admin SDK in a one-off script
firebase functions:shell
> const auth = require('firebase-admin').auth();
> auth.setCustomUserClaims('<uid>', { role: 'owner', category: 'internal' });
```

---

## Enforcement Points

### Client-side: `InternalAuthGuard`

- Subscribes to `onAuthStateChanged`
- On authenticated: reads `user.getIdTokenResult()` for custom claims
- Requires `category === "internal"` for internal routes
- Redirects to `/login` if unauthenticated or unauthorized

### Server-side: `requireInternalUser()`

- Extracts ID token from request cookies or headers
- Calls `adminAuth.verifyIdToken(token)` to validate
- Checks `decodedToken.category === "internal"`
- Returns `{ uid, email, role }` or throws 401/403

### Server-side: `requirePermission(userId, permissionCode)`

- Phase 1A: simplified role-based check (owner > admin > member)
- Phase 2+: full RBAC lookup via `roles` → `permissions` collections

### Firestore rules

Replace current stubs:

```javascript
function isInternalUser() {
  return request.auth != null
    && request.auth.token.category == "internal";
}

function isAdmin() {
  return isInternalUser()
    && (request.auth.token.role == "admin"
        || request.auth.token.role == "owner");
}

function isOwner() {
  return isInternalUser()
    && request.auth.token.role == "owner";
}
```

---

## Firebase Admin SDK Strategy

### Server-side initialization (Next.js)

The admin SDK in `apps/web/src/lib/firebase/admin.ts` uses:

```typescript
initializeApp({ projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID })
```

This relies on **Application Default Credentials (ADC)**, which works when:
- Running in Google Cloud (Cloud Run, Cloud Functions) — auto-detected
- Running in Codespaces — requires `GOOGLE_APPLICATION_CREDENTIALS` env var
  pointing to a service account JSON file
- Running locally — requires `gcloud auth application-default login` or
  the same env var

### Service account setup needed

To enable server-side auth verification in dev:

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save as `service-account-key.json` in repo root (gitignored)
4. Set `GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json` in `.env.local`

**This file must never be committed.** It is covered by `.gitignore` patterns:
- `service-account-key.json`
- `*-service-account*.json`
- `*-credentials*.json`

---

## What Remains Deferred

| Item | Deferred to |
|------|------------|
| Full RBAC (roles → permissions lookup) | Phase 1, Step 5 |
| Vendor access guard (token validation) | Phase 2+ |
| Email-based vendor login | Phase 2+ |
| Session cookie strategy for SSR | Phase 1, Step 1 |
| Multi-tenant vendor scoping | Phase 2+ |
