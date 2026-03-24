import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage, type Storage } from "firebase-admin/storage";

let app: App;
let adminAuth: Auth;
let adminDb: Firestore;
let adminStorage: Storage;

if (!getApps().length) {
  // TODO: configure service account for production
  app = initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
} else {
  app = getApps()[0]!;
}

adminAuth = getAuth(app);
adminDb = getFirestore(app);
adminStorage = getStorage(app);

export { app as adminApp, adminAuth, adminDb, adminStorage };
