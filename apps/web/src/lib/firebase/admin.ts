import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { readFileSync } from "fs";
import { resolve } from "path";

function getAdminApp(): App {
  if (getApps().length) return getApps()[0]!;

  // In production (Cloud Run / Cloud Functions), ADC provides credentials automatically.
  // In local dev, load the service account key from disk.
  const saKeyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (saKeyPath) {
    const absPath = resolve(process.cwd(), saKeyPath);
    const serviceAccount = JSON.parse(readFileSync(absPath, "utf8"));
    return initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }

  // Fallback: ADC (works in GCP environments)
  return initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

const adminApp = getAdminApp();
const adminAuth = getAuth(adminApp);
const adminDb = getFirestore(adminApp);
const adminStorage = getStorage(adminApp);

export { adminApp, adminAuth, adminDb, adminStorage };
