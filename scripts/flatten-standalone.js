/**
 * Post-build: copy nested standalone paths to flat locations so the
 * Firebase App Hosting adapter can find routes-manifest.json and server.js
 * where it expects them (.next/standalone/.next/… and .next/standalone/server.js).
 *
 * The nested structure produced by outputFileTracingRoot at the monorepo root:
 *   .next/standalone/apps/web/.next/routes-manifest.json
 *   .next/standalone/apps/web/server.js
 *
 * The adapter expects (flat):
 *   .next/standalone/.next/routes-manifest.json
 *   .next/standalone/server.js
 */
const fs = require("fs");
const path = require("path");

const standalone = path.join(__dirname, "..", "apps", "web", ".next", "standalone");
const nested = path.join(standalone, "apps", "web");

if (!fs.existsSync(nested)) {
  console.log("flatten-standalone: no nested structure found, skipping");
  process.exit(0);
}

// Copy .next dir (contains routes-manifest.json etc.)
const srcNext = path.join(nested, ".next");
const destNext = path.join(standalone, ".next");
if (fs.existsSync(srcNext) && !fs.existsSync(destNext)) {
  fs.cpSync(srcNext, destNext, { recursive: true });
  console.log("flatten-standalone: copied .next to standalone root");
}

// Copy server.js
const srcServer = path.join(nested, "server.js");
const destServer = path.join(standalone, "server.js");
if (fs.existsSync(srcServer) && !fs.existsSync(destServer)) {
  fs.copyFileSync(srcServer, destServer);
  console.log("flatten-standalone: copied server.js to standalone root");
}

console.log("flatten-standalone: done");
