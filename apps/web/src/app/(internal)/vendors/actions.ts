"use server";

import { revalidatePath } from "next/cache";
import type { Vendor, Address } from "@twg/shared";
import { COLLECTIONS, VendorStatus, ActivityEventType } from "@twg/shared";
import { requireInternalUser } from "@/lib/auth/session";
import {
  listDocuments,
  getDocument,
  createDocument,
  updateDocument,
  logActivity,
} from "@/lib/firestore";
import type { ListOptions } from "@/lib/firestore";

// ─── Reads ──────────────────────────────────────────────────────────────────

export async function getVendors(
  statusFilter?: VendorStatus,
): Promise<Vendor[]> {
  await requireInternalUser();

  const options: ListOptions = {
    orderBy: { field: "legalCompanyName", direction: "asc" },
  };

  if (statusFilter) {
    options.filters = [{ field: "status", op: "==", value: statusFilter }];
  }

  return listDocuments<Vendor>(COLLECTIONS.vendors, options);
}

export async function getVendor(id: string): Promise<Vendor | null> {
  await requireInternalUser();
  return getDocument<Vendor>(COLLECTIONS.vendors, id);
}

// ─── Validation ─────────────────────────────────────────────────────────────

interface VendorInput {
  legalCompanyName: string;
  dba?: string;
  taxId?: string;
  website?: string;
  businessAddress?: Address;
  returnAddress?: Address;
  status: VendorStatus;
  internalNotes?: string;
  internalOwnerId?: string;
}

function parseAddress(formData: FormData, prefix: string): Address | undefined {
  const line1 = (formData.get(`${prefix}.line1`) as string) ?? "";
  if (!line1.trim()) return undefined;

  return {
    line1: line1.trim(),
    line2: ((formData.get(`${prefix}.line2`) as string) ?? "").trim() || undefined,
    city: ((formData.get(`${prefix}.city`) as string) ?? "").trim(),
    state: ((formData.get(`${prefix}.state`) as string) ?? "").trim(),
    postalCode: ((formData.get(`${prefix}.postalCode`) as string) ?? "").trim(),
    country: ((formData.get(`${prefix}.country`) as string) ?? "").trim() || "US",
  };
}

function parseVendorInput(formData: FormData): VendorInput {
  return {
    legalCompanyName: ((formData.get("legalCompanyName") as string) ?? "").trim(),
    dba: ((formData.get("dba") as string) ?? "").trim() || undefined,
    taxId: ((formData.get("taxId") as string) ?? "").trim() || undefined,
    website: ((formData.get("website") as string) ?? "").trim() || undefined,
    businessAddress: parseAddress(formData, "businessAddress"),
    returnAddress: parseAddress(formData, "returnAddress"),
    status: (formData.get("status") as VendorStatus) ?? VendorStatus.Active,
    internalNotes: ((formData.get("internalNotes") as string) ?? "").trim() || undefined,
    internalOwnerId: ((formData.get("internalOwnerId") as string) ?? "").trim() || undefined,
  };
}

function validateVendorInput(input: VendorInput): string[] {
  const errors: string[] = [];
  if (!input.legalCompanyName) errors.push("Legal company name is required.");
  if (!Object.values(VendorStatus).includes(input.status))
    errors.push("Invalid status.");
  return errors;
}

// ─── Mutations ──────────────────────────────────────────────────────────────

export interface ActionResult {
  success: boolean;
  errors?: string[];
  id?: string;
}

export async function createVendor(
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireInternalUser();

  const input = parseVendorInput(formData);
  const errors = validateVendorInput(input);
  if (errors.length > 0) return { success: false, errors };

  const id = await createDocument<Vendor>(
    COLLECTIONS.vendors,
    input,
    user.uid,
  );

  await logActivity({
    eventType: ActivityEventType.Created,
    actorId: user.uid,
    actorCategory: user.category,
    targetCollection: COLLECTIONS.vendors,
    targetId: id,
    description: `Created vendor "${input.legalCompanyName}"`,
  });

  revalidatePath("/vendors");
  return { success: true, id };
}

export async function updateVendor(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireInternalUser();

  const existing = await getDocument<Vendor>(COLLECTIONS.vendors, id);
  if (!existing) return { success: false, errors: ["Vendor not found."] };

  const input = parseVendorInput(formData);
  const errors = validateVendorInput(input);
  if (errors.length > 0) return { success: false, errors };

  await updateDocument(COLLECTIONS.vendors, id, { ...input }, user.uid);

  await logActivity({
    eventType: ActivityEventType.Updated,
    actorId: user.uid,
    actorCategory: user.category,
    targetCollection: COLLECTIONS.vendors,
    targetId: id,
    description: `Updated vendor "${input.legalCompanyName}"`,
  });

  revalidatePath("/vendors");
  revalidatePath(`/vendors/${id}`);
  return { success: true, id };
}
