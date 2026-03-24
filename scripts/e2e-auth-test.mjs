#!/usr/bin/env node
/**
 * End-to-end auth flow test against the running dev server.
 * Tests: sign-in → session cookie → dashboard access → logout → redirect.
 *
 * Usage:
 *   TWG_E2E_EMAIL="user@example.com" TWG_E2E_PASSWORD="xxx" node scripts/e2e-auth-test.mjs
 *
 * Requires: dev server running on PORT (default 3007)
 */

import http from "http";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const E2E_EMAIL = process.env.TWG_E2E_EMAIL;
const E2E_PASSWORD = process.env.TWG_E2E_PASSWORD;
if (!E2E_EMAIL || !E2E_PASSWORD) {
  console.error("ERROR: TWG_E2E_EMAIL and TWG_E2E_PASSWORD env vars are required.");
  process.exit(1);
}

const PORT = process.env.PORT || 3007;

const app = initializeApp({
  apiKey: "AIzaSyBKjQsTYc4F60HV1yYHkPpQ1Cukpgh2u_U",
  authDomain: "twg-dev.firebaseapp.com",
  projectId: "twg-dev",
});
const auth = getAuth(app);

function request(method, path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const opts = { hostname: "localhost", port: PORT, path, method, headers: { ...headers } };
    if (body) opts.headers["Content-Type"] = "application/json";
    const req = http.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () =>
        resolve({ status: res.statusCode, headers: res.headers, body: data })
      );
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

let passed = 0;
let failed = 0;
function check(name, condition) {
  if (condition) {
    console.log(`  ✅ ${name}`);
    passed++;
  } else {
    console.log(`  ❌ ${name}`);
    failed++;
  }
}

async function run() {
  // --- Step 1: Sign in ---
  console.log("\n=== Step 1: Firebase signInWithEmailAndPassword ===");
  const credential = await signInWithEmailAndPassword(auth, E2E_EMAIL, E2E_PASSWORD);
  const user = credential.user;
  console.log("  Signed in as:", user.email, "| UID:", user.uid);

  // --- Step 2: Check claims ---
  console.log("\n=== Step 2: Check ID token claims ===");
  const tokenResult = await user.getIdTokenResult(true);
  console.log("  role:", tokenResult.claims.role || "(missing)");
  console.log("  category:", tokenResult.claims.category || "(missing)");
  check("role === owner", tokenResult.claims.role === "owner");
  check("category === internal", tokenResult.claims.category === "internal");

  // --- Step 3: Create session ---
  console.log("\n=== Step 3: POST /api/auth/session ===");
  const idToken = await user.getIdToken();
  const sessionRes = await request("POST", "/api/auth/session", { idToken });
  console.log("  Status:", sessionRes.status);
  check("Session creation status 200", sessionRes.status === 200);

  const setCookieHeader = sessionRes.headers["set-cookie"];
  check("Set-Cookie header present", !!setCookieHeader);

  if (!setCookieHeader) {
    console.log("\nFAIL: No session cookie. Cannot continue.");
    process.exit(1);
  }

  const cookieStr = Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader;
  console.log("  Cookie flags:", cookieStr.replace(/^__session=[^;]+/, "__session=<redacted>"));
  const cookieValue = cookieStr.split(";")[0];
  check("Cookie name is __session", cookieValue.startsWith("__session="));
  check("Cookie is httpOnly", cookieStr.toLowerCase().includes("httponly"));

  // --- Step 4: Access /dashboard ---
  console.log("\n=== Step 4: GET /dashboard (with session cookie) ===");
  const dashRes = await request("GET", "/dashboard", null, { Cookie: cookieValue });
  console.log("  Status:", dashRes.status);
  check("Dashboard loads (200, not redirect)", dashRes.status === 200);

  // --- Step 5: Access /vendors ---
  console.log("\n=== Step 5: GET /vendors (with session cookie) ===");
  const vendorsRes = await request("GET", "/vendors", null, { Cookie: cookieValue });
  console.log("  Status:", vendorsRes.status);
  check("Vendors loads (200)", vendorsRes.status === 200);

  // --- Step 6: Logout ---
  console.log("\n=== Step 6: DELETE /api/auth/session (logout) ===");
  const logoutRes = await request("DELETE", "/api/auth/session", null, { Cookie: cookieValue });
  console.log("  Status:", logoutRes.status);
  check("Logout status 200", logoutRes.status === 200);

  // --- Step 7: Verify redirect after logout ---
  console.log("\n=== Step 7: GET /dashboard (after logout) ===");
  const postLogoutRes = await request("GET", "/dashboard");
  console.log("  Status:", postLogoutRes.status, "| Location:", postLogoutRes.headers.location || "none");
  check("Redirects to /login", postLogoutRes.status === 307 && postLogoutRes.headers.location === "/login");

  // --- Summary ---
  console.log("\n========================================");
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log("========================================\n");

  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error("TEST FAILED:", err.message || err);
  process.exit(1);
});
