# ------------------------------------------------------------------
# TWG Web — multi-stage Docker build for Firebase App Hosting / Cloud Run
# Context: repo root (monorepo)
# ------------------------------------------------------------------

# ── Stage 1: build ──────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# Copy package manifests and shared config first for better layer caching
COPY package.json package-lock.json tsconfig.base.json ./
COPY packages/shared/package.json packages/shared/
COPY apps/web/package.json apps/web/

# Install all deps (including devDependencies for build)
RUN npm ci

# Copy source
COPY packages/shared/ packages/shared/
COPY apps/web/ apps/web/
COPY scripts/ scripts/

# Build shared lib first, then web
RUN npm run build --workspace=packages/shared
RUN npm run build --workspace=apps/web

# ── Stage 2: runtime ───────────────────────────────────────────────
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy the standalone output (monorepo-rooted structure)
COPY --from=build /app/apps/web/.next/standalone ./

# Copy static assets that Next.js standalone doesn't include
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# server.js is inside the monorepo-mirrored path
CMD ["node", "apps/web/server.js"]
