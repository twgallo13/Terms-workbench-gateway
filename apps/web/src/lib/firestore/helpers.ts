import {
  type DocumentData,
  type WhereFilterOp,
  type OrderByDirection,
} from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface QueryFilter {
  field: string;
  op: WhereFilterOp;
  value: unknown;
}

export interface QueryOrder {
  field: string;
  direction: OrderByDirection;
}

export interface ListOptions {
  filters?: QueryFilter[];
  orderBy?: QueryOrder;
  limit?: number;
}

// ─── Read helpers ───────────────────────────────────────────────────────────

export async function getDocument<T>(
  collection: string,
  id: string,
): Promise<T | null> {
  const snap = await adminDb.collection(collection).doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as T;
}

export async function listDocuments<T>(
  collection: string,
  options: ListOptions = {},
): Promise<T[]> {
  let query: FirebaseFirestore.Query<DocumentData> =
    adminDb.collection(collection);

  if (options.filters) {
    for (const f of options.filters) {
      query = query.where(f.field, f.op, f.value);
    }
  }

  if (options.orderBy) {
    query = query.orderBy(options.orderBy.field, options.orderBy.direction);
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const snap = await query.get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
}

// ─── Write helpers ──────────────────────────────────────────────────────────

export async function createDocument<T extends { id?: string }>(
  collection: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy">,
  actorId: string,
): Promise<string> {
  const now = new Date().toISOString();
  const ref = adminDb.collection(collection).doc();
  await ref.set({
    ...data,
    createdAt: now,
    updatedAt: now,
    createdBy: actorId,
    updatedBy: actorId,
  });
  return ref.id;
}

export async function updateDocument(
  collection: string,
  id: string,
  data: Record<string, unknown>,
  actorId: string,
): Promise<void> {
  const now = new Date().toISOString();
  await adminDb
    .collection(collection)
    .doc(id)
    .update({
      ...data,
      updatedAt: now,
      updatedBy: actorId,
    });
}

export async function deleteDocument(
  collection: string,
  id: string,
): Promise<void> {
  await adminDb.collection(collection).doc(id).delete();
}

// ─── Activity logging ───────────────────────────────────────────────────────

export async function logActivity(entry: {
  eventType: string;
  actorId: string;
  actorCategory: string;
  targetCollection: string;
  targetId: string;
  description: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const ref = adminDb.collection("activityLogs").doc();
  await ref.set({
    ...entry,
    createdAt: new Date().toISOString(),
  });
}
