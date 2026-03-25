"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { ContactStatus, ContactType } from "@twg/shared";
import type { Contact } from "@twg/shared";
import type { ActionResult } from "./actions";

interface ContactFormProps {
  contact?: Contact;
  vendors: { id: string; legalCompanyName: string }[];
  action: (formData: FormData) => Promise<ActionResult>;
  onSuccess?: () => void;
  onCancel: () => void;
}

const INPUT_CLASS =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";

const STATUS_OPTIONS: { value: ContactStatus; label: string }[] = [
  { value: ContactStatus.Active, label: "Active" },
  { value: ContactStatus.Inactive, label: "Inactive" },
];

const TYPE_OPTIONS: { value: ContactType; label: string }[] = [
  { value: ContactType.Primary, label: "Primary" },
  { value: ContactType.Legal, label: "Legal" },
  { value: ContactType.Operations, label: "Operations" },
  { value: ContactType.Support, label: "Support" },
  { value: ContactType.Billing, label: "Billing" },
  { value: ContactType.Other, label: "Other" },
];

export function ContactForm({
  contact,
  vendors,
  action,
  onSuccess,
  onCancel,
}: ContactFormProps) {
  const handleSubmit = async (formData: FormData) => {
    const result = await action(formData);
    if (result.success && onSuccess) {
      onSuccess();
    }
    return result;
  };

  const [state, submitAction, isPending] = useActionState<
    ActionResult | null,
    FormData
  >((_prev, formData) => handleSubmit(formData), null);

  return (
    <form action={submitAction} className="space-y-5">
      {state?.errors && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
          {state.errors.map((err) => (
            <p key={err} className="text-sm text-red-700">
              {err}
            </p>
          ))}
        </div>
      )}

      {/* ── Name fields ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            defaultValue={contact?.firstName ?? ""}
            placeholder="e.g. John"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            defaultValue={contact?.lastName ?? ""}
            placeholder="e.g. Smith"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      {/* ── Email + Phone ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={contact?.email ?? ""}
            placeholder="e.g. john@acme.com"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={contact?.phone ?? ""}
            placeholder="e.g. (555) 123-4567"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      {/* ── Title + Vendor ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={contact?.title ?? ""}
            placeholder="e.g. VP of Sales"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label
            htmlFor="vendorId"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Vendor <span className="text-red-500">*</span>
          </label>
          <select
            id="vendorId"
            name="vendorId"
            required
            defaultValue={contact?.vendorId ?? ""}
            className={INPUT_CLASS}
          >
            <option value="">Select a vendor…</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.legalCompanyName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Type + Status ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contactType"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Contact Type
          </label>
          <select
            id="contactType"
            name="contactType"
            defaultValue={contact?.contactType ?? ContactType.Primary}
            className={INPUT_CLASS}
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="status"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={contact?.status ?? ContactStatus.Active}
            className={INPUT_CLASS}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Primary checkbox ───────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <input
          id="isPrimary"
          name="isPrimary"
          type="checkbox"
          defaultChecked={contact?.isPrimary ?? false}
          className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
        />
        <label htmlFor="isPrimary" className="text-sm text-gray-700">
          Primary contact for this vendor
        </label>
      </div>

      {/* ── Actions ────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Saving…"
            : contact
              ? "Save Changes"
              : "Create Contact"}
        </Button>
      </div>
    </form>
  );
}
