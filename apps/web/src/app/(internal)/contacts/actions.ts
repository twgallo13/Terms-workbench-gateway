"use server";

import { revalidatePath } from "next/cache";
import type { Contact, Vendor } from "@twg/shared";
import {
  COLLECTIONS,
  ContactStatus,
  ContactType,
  ActivityEventType,
} from "@twg/shared";
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

export async function getContacts(
  vendorId?: string,
  statusFilter?: ContactStatus,
): Promise<Contact[]> {
  await requireInternalUser();

  const options: ListOptions = {
    orderBy: { field: "lastName", direction: "asc" },
  };

  const filters: ListOptions["filters"] = [];
  if (vendorId) {
    filters.push({ field: "vendorId", op: "==", value: vendorId });
  }
  if (statusFilter) {
    filters.push({ field: "status", op: "==", value: statusFilter });
  }
  if (filters.length > 0) {
    options.filters = filters;
  }

  return listDocuments<Contact>(COLLECTIONS.contacts, options);
}

export async function getContact(id: string): Promise<Contact | null> {
  await requireInternalUser();
  return getDocument<Contact>(COLLECTIONS.contacts, id);
}

// ─── Validation ─────────────────────────────────────────────────────────────

interface ContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title?: string;
  contactType: ContactType;
  vendorId: string;
  status: ContactStatus;
  isPrimary: boolean;
}

function parseContactInput(formData: FormData): ContactInput {
  return {
    firstName: ((formData.get("firstName") as string) ?? "").trim(),
    lastName: ((formData.get("lastName") as string) ?? "").trim(),
    email: ((formData.get("email") as string) ?? "").trim(),
    phone: ((formData.get("phone") as string) ?? "").trim() || undefined,
    title: ((formData.get("title") as string) ?? "").trim() || undefined,
    contactType:
      (formData.get("contactType") as ContactType) ?? ContactType.Primary,
    vendorId: ((formData.get("vendorId") as string) ?? "").trim(),
    status:
      (formData.get("status") as ContactStatus) ?? ContactStatus.Active,
    isPrimary: formData.get("isPrimary") === "on",
  };
}

function validateContactInput(input: ContactInput): string[] {
  const errors: string[] = [];
  if (!input.firstName) errors.push("First name is required.");
  if (!input.lastName) errors.push("Last name is required.");
  if (!input.email) errors.push("Email is required.");
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email))
    errors.push("Email format is invalid.");
  if (!input.vendorId) errors.push("Vendor is required.");
  if (!Object.values(ContactType).includes(input.contactType))
    errors.push("Invalid contact type.");
  if (!Object.values(ContactStatus).includes(input.status))
    errors.push("Invalid status.");
  return errors;
}

// ─── Mutations ──────────────────────────────────────────────────────────────

export interface ActionResult {
  success: boolean;
  errors?: string[];
  id?: string;
}

export async function createContact(
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireInternalUser();

  const input = parseContactInput(formData);
  const errors = validateContactInput(input);
  if (errors.length > 0) return { success: false, errors };

  // Verify vendor exists
  const vendor = await getDocument<Vendor>(COLLECTIONS.vendors, input.vendorId);
  if (!vendor)
    return { success: false, errors: ["Selected vendor not found."] };

  const id = await createDocument<Contact>(
    COLLECTIONS.contacts,
    input,
    user.uid,
  );

  await logActivity({
    eventType: ActivityEventType.Created,
    actorId: user.uid,
    actorCategory: user.category,
    targetCollection: COLLECTIONS.contacts,
    targetId: id,
    description: `Created contact "${input.firstName} ${input.lastName}"`,
  });

  revalidatePath("/contacts");
  return { success: true, id };
}

export async function updateContact(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireInternalUser();

  const existing = await getDocument<Contact>(COLLECTIONS.contacts, id);
  if (!existing) return { success: false, errors: ["Contact not found."] };

  const input = parseContactInput(formData);
  const errors = validateContactInput(input);
  if (errors.length > 0) return { success: false, errors };

  // Verify vendor exists
  const vendor = await getDocument<Vendor>(COLLECTIONS.vendors, input.vendorId);
  if (!vendor)
    return { success: false, errors: ["Selected vendor not found."] };

  await updateDocument(COLLECTIONS.contacts, id, { ...input }, user.uid);

  await logActivity({
    eventType: ActivityEventType.Updated,
    actorId: user.uid,
    actorCategory: user.category,
    targetCollection: COLLECTIONS.contacts,
    targetId: id,
    description: `Updated contact "${input.firstName} ${input.lastName}"`,
  });

  revalidatePath("/contacts");
  revalidatePath(`/contacts/${id}`);
  return { success: true, id };
}
