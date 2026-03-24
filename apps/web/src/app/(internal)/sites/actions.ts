"use server";

import { revalidatePath } from "next/cache";
import type { Site } from "@twg/shared";
import { COLLECTIONS, SiteStatus, ActivityEventType } from "@twg/shared";
import { requireInternalUser } from "@/lib/auth/session";
import {
  listDocuments,
  getDocument,
  createDocument,
  updateDocument,
  logActivity,
} from "@/lib/firestore";

// ─── Reads ──────────────────────────────────────────────────────────────────

export async function getSites(): Promise<Site[]> {
  await requireInternalUser();
  return listDocuments<Site>(COLLECTIONS.sites, {
    orderBy: { field: "sortOrder", direction: "asc" },
  });
}

export async function getSite(id: string): Promise<Site | null> {
  await requireInternalUser();
  return getDocument<Site>(COLLECTIONS.sites, id);
}

// ─── Validation ─────────────────────────────────────────────────────────────

interface SiteInput {
  name: string;
  displayLabel: string;
  domain: string;
  status: SiteStatus;
  sortOrder: number;
}

function validateSiteInput(input: SiteInput): string[] {
  const errors: string[] = [];
  if (!input.name.trim()) errors.push("Name is required.");
  if (!input.displayLabel.trim()) errors.push("Display label is required.");
  if (!input.domain.trim()) errors.push("Domain is required.");
  if (!Object.values(SiteStatus).includes(input.status))
    errors.push("Invalid status.");
  if (typeof input.sortOrder !== "number" || input.sortOrder < 0)
    errors.push("Sort order must be a non-negative number.");
  return errors;
}

// ─── Mutations ──────────────────────────────────────────────────────────────

export interface ActionResult {
  success: boolean;
  errors?: string[];
  id?: string;
}

export async function createSite(formData: FormData): Promise<ActionResult> {
  const user = await requireInternalUser();
  if (user.role !== "owner") {
    return { success: false, errors: ["Only admins can create sites."] };
  }

  const input: SiteInput = {
    name: (formData.get("name") as string) ?? "",
    displayLabel: (formData.get("displayLabel") as string) ?? "",
    domain: (formData.get("domain") as string) ?? "",
    status: (formData.get("status") as SiteStatus) ?? SiteStatus.Active,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };

  const errors = validateSiteInput(input);
  if (errors.length > 0) return { success: false, errors };

  const id = await createDocument<Site>(COLLECTIONS.sites, input, user.uid);

  await logActivity({
    eventType: ActivityEventType.Created,
    actorId: user.uid,
    actorCategory: user.category,
    targetCollection: COLLECTIONS.sites,
    targetId: id,
    description: `Created site "${input.name}"`,
  });

  revalidatePath("/sites");
  return { success: true, id };
}

export async function updateSite(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireInternalUser();
  if (user.role !== "owner") {
    return { success: false, errors: ["Only admins can edit sites."] };
  }

  const existing = await getDocument<Site>(COLLECTIONS.sites, id);
  if (!existing) return { success: false, errors: ["Site not found."] };

  const input: SiteInput = {
    name: (formData.get("name") as string) ?? "",
    displayLabel: (formData.get("displayLabel") as string) ?? "",
    domain: (formData.get("domain") as string) ?? "",
    status: (formData.get("status") as SiteStatus) ?? SiteStatus.Active,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };

  const errors = validateSiteInput(input);
  if (errors.length > 0) return { success: false, errors };

  await updateDocument(COLLECTIONS.sites, id, { ...input }, user.uid);

  await logActivity({
    eventType: ActivityEventType.Updated,
    actorId: user.uid,
    actorCategory: user.category,
    targetCollection: COLLECTIONS.sites,
    targetId: id,
    description: `Updated site "${input.name}"`,
  });

  revalidatePath("/sites");
  revalidatePath(`/sites/${id}`);
  return { success: true, id };
}
