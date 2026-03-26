import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import cors from "cors";
import { provisionUserCore } from "./provision-user-core";

// Permissive CORS — reflects the request origin.
// Replace with a whitelist array for production lockdown if desired.
const corsHandler = cors({ origin: true });

/**
 * bootstrapUserOnRequest — CORS-safe HTTP onRequest wrapper.
 *
 * Handles OPTIONS preflight and POST requests with proper
 * Access-Control-Allow-Origin headers. Calls the same provisionUserCore
 * helper used by the onCall bootstrapUser function.
 *
 * Expected headers:
 *   Authorization: Bearer <Firebase ID token>
 *   Content-Type: application/json
 */
export const bootstrapUserOnRequest = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      // OPTIONS preflight is handled by the cors middleware — just respond 204
      if (req.method === "OPTIONS") {
        return res.status(204).send("");
      }

      if (req.method !== "POST") {
        return res.status(405).json({ error: "method-not-allowed", message: "Only POST is accepted." });
      }

      // Extract and validate Bearer token
      const authHeader = req.get("Authorization") || "";
      const idToken = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;

      if (!idToken) {
        return res.status(401).json({ error: "unauthenticated", message: "Missing auth token." });
      }

      const decoded = await admin.auth().verifyIdToken(idToken).catch((err) => {
        console.error("[bootstrapUserOnRequest] Token verify failed:", err);
        return null;
      });

      if (!decoded) {
        return res.status(401).json({ error: "unauthenticated", message: "Invalid auth token." });
      }

      const uid = decoded.uid;
      const email = decoded.email;

      if (!email) {
        return res.status(400).json({ error: "invalid-argument", message: "User must have an email address." });
      }

      const displayName = (decoded.name as string) ?? undefined;

      // Call the shared provisioning logic
      const result = await provisionUserCore(uid, email, displayName);

      if (result.status === "denied") {
        return res.status(403).json({ error: "permission-denied", message: result.reason ?? "Access denied." });
      }

      return res.status(200).json(result);
    } catch (err: unknown) {
      console.error("[bootstrapUserOnRequest] Error:", err);
      const error = err as { code?: string; message?: string };
      return res.status(500).json({
        error: error.code ?? "internal",
        message: error.message ?? "Internal error.",
      });
    }
  });
});
