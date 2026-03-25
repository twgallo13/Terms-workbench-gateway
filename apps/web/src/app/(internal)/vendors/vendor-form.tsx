"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { VendorStatus } from "@twg/shared";
import type { Vendor, Address } from "@twg/shared";
import type { ActionResult } from "./actions";

interface VendorFormProps {
  vendor?: Vendor;
  action: (formData: FormData) => Promise<ActionResult>;
  onSuccess?: () => void;
  onCancel: () => void;
}

const INPUT_CLASS =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";

const STATUS_OPTIONS: { value: VendorStatus; label: string }[] = [
  { value: VendorStatus.Active, label: "Active" },
  { value: VendorStatus.Inactive, label: "Inactive" },
  { value: VendorStatus.Suspended, label: "Suspended" },
  { value: VendorStatus.Archived, label: "Archived" },
];

function AddressFields({
  prefix,
  label,
  address,
}: {
  prefix: string;
  label: string;
  address?: Address;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-gray-700">{label}</legend>

      <div>
        <label
          htmlFor={`${prefix}.line1`}
          className="mb-1 block text-xs text-gray-500"
        >
          Street Address
        </label>
        <input
          id={`${prefix}.line1`}
          name={`${prefix}.line1`}
          type="text"
          defaultValue={address?.line1 ?? ""}
          placeholder="123 Main St"
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label
          htmlFor={`${prefix}.line2`}
          className="mb-1 block text-xs text-gray-500"
        >
          Suite / Unit
        </label>
        <input
          id={`${prefix}.line2`}
          name={`${prefix}.line2`}
          type="text"
          defaultValue={address?.line2 ?? ""}
          placeholder="Suite 100"
          className={INPUT_CLASS}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor={`${prefix}.city`}
            className="mb-1 block text-xs text-gray-500"
          >
            City
          </label>
          <input
            id={`${prefix}.city`}
            name={`${prefix}.city`}
            type="text"
            defaultValue={address?.city ?? ""}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label
            htmlFor={`${prefix}.state`}
            className="mb-1 block text-xs text-gray-500"
          >
            State
          </label>
          <input
            id={`${prefix}.state`}
            name={`${prefix}.state`}
            type="text"
            defaultValue={address?.state ?? ""}
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor={`${prefix}.postalCode`}
            className="mb-1 block text-xs text-gray-500"
          >
            ZIP / Postal Code
          </label>
          <input
            id={`${prefix}.postalCode`}
            name={`${prefix}.postalCode`}
            type="text"
            defaultValue={address?.postalCode ?? ""}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label
            htmlFor={`${prefix}.country`}
            className="mb-1 block text-xs text-gray-500"
          >
            Country
          </label>
          <input
            id={`${prefix}.country`}
            name={`${prefix}.country`}
            type="text"
            defaultValue={address?.country ?? "US"}
            className={INPUT_CLASS}
          />
        </div>
      </div>
    </fieldset>
  );
}

export function VendorForm({
  vendor,
  action,
  onSuccess,
  onCancel,
}: VendorFormProps) {
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

      {/* ── Core fields ────────────────────────────────────────────────── */}
      <div>
        <label
          htmlFor="legalCompanyName"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Legal Company Name <span className="text-red-500">*</span>
        </label>
        <input
          id="legalCompanyName"
          name="legalCompanyName"
          type="text"
          required
          defaultValue={vendor?.legalCompanyName ?? ""}
          placeholder="e.g. Acme Industries LLC"
          className={INPUT_CLASS}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="dba"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            DBA (Doing Business As)
          </label>
          <input
            id="dba"
            name="dba"
            type="text"
            defaultValue={vendor?.dba ?? ""}
            placeholder="e.g. Acme"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label
            htmlFor="taxId"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Tax ID
          </label>
          <input
            id="taxId"
            name="taxId"
            type="text"
            defaultValue={vendor?.taxId ?? ""}
            placeholder="e.g. 12-3456789"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="website"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Website
          </label>
          <input
            id="website"
            name="website"
            type="text"
            defaultValue={vendor?.website ?? ""}
            placeholder="e.g. https://acme.com"
            className={INPUT_CLASS}
          />
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
            defaultValue={vendor?.status ?? VendorStatus.Active}
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

      {/* ── Address sections ───────────────────────────────────────────── */}
      <div className="grid gap-5 border-t border-gray-200 pt-5 lg:grid-cols-2">
        <AddressFields
          prefix="businessAddress"
          label="Business Address"
          address={vendor?.businessAddress}
        />
        <AddressFields
          prefix="returnAddress"
          label="Return Address"
          address={vendor?.returnAddress}
        />
      </div>

      {/* ── Internal notes ─────────────────────────────────────────────── */}
      <div className="border-t border-gray-200 pt-5">
        <label
          htmlFor="internalNotes"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Internal Notes
        </label>
        <textarea
          id="internalNotes"
          name="internalNotes"
          rows={3}
          defaultValue={vendor?.internalNotes ?? ""}
          placeholder="Internal-only notes about this vendor…"
          className={INPUT_CLASS}
        />
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
            : vendor
              ? "Save Changes"
              : "Create Vendor"}
        </Button>
      </div>
    </form>
  );
}
