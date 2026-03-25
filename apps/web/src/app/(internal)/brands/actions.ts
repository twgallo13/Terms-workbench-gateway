"use server";

import { revalidatePath } from "next/cache";
import type { Brand, Vendor } from "@twg/shared";
import { COLLECTIONS, BrandStatus, ActivityEventType } from "@twg/shared";
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

export async function getBrands(
  statusFilter?: BrandStatus,
  vendorId?: string,
): Promise<Brand[]> {
  await requireInternalUser();

  const options: ListOptions = {
    orderBy: { field: "brandName", direction: "asc" },
  };

  const filters: ListOptions["filters"] = [];
  if (statusFilter) {
    filters.push({ field: "status", op: "==", value: statusFilter });
  }
  if (vendorId) {
    filters.push({ field: "vendorId", op: "==", value: vendorId });
  }
  if (filters.length > 0) {
    options.filters = filters;
  }

  return listDocuments<Brand>(COLLECTIONS.brands, options);
}

export async function getBrand(id: string): Promise<Brand | null> {
  await requireInternalUser();
  return getDocument<Brand>(COLLECTIONS.brands, id);
}

// ─── Vendor helpers (for picker + name resolution) ──────────────────────────

export async function getVendorsForPicker(): Promise<
  { id: string; legalCompanyName: string }[]
> {
  await requireInternalUser();
  const vendors = await listDocuments<Vendor>(COLLECTIONS.vendors, {
    orderBy: { field: "legalCompanyName", direction: "asc" },
  });
  return vendors.map((v) => ({ id: v.id, legalCompanyName: v.legalCompanyName }));
}

// ─── Validation ─────────────────────────────────────────────────────────────

interface BrandInput {
  brandName: string;
  vendorId: string;
  status: BrandStatus;
  internalNotes?: string;
}

function parseBrandInput(formData: FormData): BrandInput {
  return {
    brandName: ((formData.get("brandName") as string) ?? "").trim(),
    vendorId: ((formData.get("vendorId") as string) ?? "").trim(),
    status: (formData.get("status") as BrandStatus) ?? BrandStatus.Active,
    internalNotes:
      ((formData.get("internalNotes") as string) ?? "").trim() || undefined,
  };
}

function validateBrandInput(input: BrandInput): string[] {
  const errors: string[] = [];
  if (!input.brandName) errors.push("Brand name is required.");
  if (!input.vendorId) errors.push("Vendor is required.");
  if (!Object.values(BrandStatus).includes(input.status))
    errors.push("Invalid status.");
  return errors;
}

// ─── Mutations ──────────────────────────────────────────────────────────────

export interface ActionResult {
  success: boolean;
  errors?: string[];
  id?: string;
}

export async function createBrand(formData: FormData): Promise<ActionResult> {
  const user = await requireInternalUser();

  const input = parseBrandInput(formData);
  const errors = validateBrandInput(input);
  if (errors.length > 0) return { success: false, errors };

  // Verify vendor exists
  const vendor = await getDocument<Vendor>(COLLECTIONS.vendors, input.vendorId);
  if (!vendor) return { success: false, errors: ["Selected vendor not found."] };

  const id = await createDocument<Brand>(COLLECTIONS.brands, input, user.uid);

  await logActivity({
    eventType: ActivityEventType.Created,
    actorId: user.uid,
    actorCategory: user.category,
    targetCollection: COLLECTIONS.brands,
    targetId: id,
    description: `Created brand "${input.brandName}"`,
  });

  revalidatePath("/brands");
  return { success: true, id };
}

export async function updateBrand(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireInternalUser();

  const existing = await getDocument<Brand>(COLLECTIONS.brands, id);
  if (!existing) return { success: false, errors: ["Brand not found."] };

  const input = parseBrandInput(formData);
  const errors = validateBrandInput(input);
  if (errors.length > 0) return { success: false, errors };

  // Verify vendor exists
  const vendor = await getDocument<Vendor>(COLLECTIONS.vendors, input.vendorId);
  if (!vendor) return { success: false, errors: ["Selected vendor not found."] };

  await updateDocument(COLLECTIONS.brands, id, { ...input }, user.uid);

  await logActivity({
    eventType: ActivityEventType.Updated,
    actorId: user.uid,
    actorCategory: user.category,
    targetCollection: COLLECTIONS.brands,
    targetId: id,
    description: `Updated brand "${input.brandName}"`,
  });

  revalidatePath("/brands");
  revalidatePath(`/brands/${id}`);
  return { success: true, id };
}
