"use server";

import { revalidatePath } from "next/cache";
import type { BrandContactAssignment, Contact, Brand } from "@twg/shared";
import { COLLECTIONS, ContactType, ActivityEventType } from "@twg/shared";
import { requireInternalUser } from "@/lib/auth/session";
import {
  listDocuments,
  getDocument,
  createDocument,
  deleteDocument,
  logActivity,
} from "@/lib/firestore";

// ─── Reads ──────────────────────────────────────────────────────────────────

export async function getBrandContacts(
  brandId: string,
): Promise<(BrandContactAssignment & { contactName: string; contactEmail: string })[]> {
  await requireInternalUser();

  const assignments = await listDocuments<BrandContactAssignment>(
    COLLECTIONS.brandContactAssignments,
    { filters: [{ field: "brandId", op: "==", value: brandId }] },
  );

  // Resolve contact names in parallel
  const enriched = await Promise.all(
    assignments.map(async (a) => {
      const contact = await getDocument<Contact>(COLLECTIONS.contacts, a.contactId);
      return {
        ...a,
        contactName: contact
          ? `${contact.firstName} ${contact.lastName}`
          : "Unknown",
        contactEmail: contact?.email ?? "",
      };
    }),
  );

  return enriched;
}

export async function getContactBrands(
  contactId: string,
): Promise<(BrandContactAssignment & { brandName: string })[]> {
  await requireInternalUser();

  const assignments = await listDocuments<BrandContactAssignment>(
    COLLECTIONS.brandContactAssignments,
    { filters: [{ field: "contactId", op: "==", value: contactId }] },
  );

  const enriched = await Promise.all(
    assignments.map(async (a) => {
      const brand = await getDocument<Brand>(COLLECTIONS.brands, a.brandId);
      return {
        ...a,
        brandName: brand?.brandName ?? "Unknown",
      };
    }),
  );

  return enriched;
}

// ─── Mutations ──────────────────────────────────────────────────────────────

export interface AssignmentResult {
  success: boolean;
  errors?: string[];
  id?: string;
}

export async function assignContactToBrand(
  brandId: string,
  contactId: string,
  contactType: ContactType,
  isPrimary: boolean,
): Promise<AssignmentResult> {
  const user = await requireInternalUser();

  // Verify brand exists
  const brand = await getDocument<Brand>(COLLECTIONS.brands, brandId);
  if (!brand) return { success: false, errors: ["Brand not found."] };

  // Verify contact exists
  const contact = await getDocument<Contact>(COLLECTIONS.contacts, contactId);
  if (!contact) return { success: false, errors: ["Contact not found."] };

  // Check for duplicate assignment
  const existing = await listDocuments<BrandContactAssignment>(
    COLLECTIONS.brandContactAssignments,
    {
      filters: [
        { field: "brandId", op: "==", value: brandId },
        { field: "contactId", op: "==", value: contactId },
      ],
    },
  );
  if (existing.length > 0) {
    return { success: false, errors: ["Contact is already assigned to this brand."] };
  }

  const id = await createDocument<BrandContactAssignment>(
    COLLECTIONS.brandContactAssignments,
    {
      brandId,
      contactId,
      contactType,
      isPrimary,
      isActive: true,
    },
    user.uid,
  );

  await logActivity({
    eventType: ActivityEventType.Created,
    actorId: user.uid,
    actorCategory: user.category,
    targetCollection: COLLECTIONS.brandContactAssignments,
    targetId: id,
    description: `Assigned contact "${contact.firstName} ${contact.lastName}" to brand "${brand.brandName}"`,
  });

  revalidatePath(`/brands/${brandId}`);
  revalidatePath(`/contacts/${contactId}`);
  return { success: true, id };
}

export async function removeContactFromBrand(
  assignmentId: string,
): Promise<AssignmentResult> {
  const user = await requireInternalUser();

  const assignment = await getDocument<BrandContactAssignment>(
    COLLECTIONS.brandContactAssignments,
    assignmentId,
  );
  if (!assignment) return { success: false, errors: ["Assignment not found."] };

  await deleteDocument(COLLECTIONS.brandContactAssignments, assignmentId);

  await logActivity({
    eventType: ActivityEventType.Updated,
    actorId: user.uid,
    actorCategory: user.category,
    targetCollection: COLLECTIONS.brandContactAssignments,
    targetId: assignmentId,
    description: `Removed contact assignment from brand`,
    metadata: {
      brandId: assignment.brandId,
      contactId: assignment.contactId,
    },
  });

  revalidatePath(`/brands/${assignment.brandId}`);
  revalidatePath(`/contacts/${assignment.contactId}`);
  return { success: true };
}
