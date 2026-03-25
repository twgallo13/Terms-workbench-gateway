"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { BrandStatus } from "@twg/shared";
import type { Brand } from "@twg/shared";
import type { ActionResult } from "./actions";

interface BrandFormProps {
  brand?: Brand;
  vendors: { id: string; legalCompanyName: string }[];
  action: (formData: FormData) => Promise<ActionResult>;
  onSuccess?: () => void;
  onCancel: () => void;
}

const INPUT_CLASS =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";

const STATUS_OPTIONS: { value: BrandStatus; label: string }[] = [
  { value: BrandStatus.Active, label: "Active" },
  { value: BrandStatus.Inactive, label: "Inactive" },
  { value: BrandStatus.PendingApproval, label: "Pending Approval" },
  { value: BrandStatus.Archived, label: "Archived" },
];

export function BrandForm({
  brand,
  vendors,
  action,
  onSuccess,
  onCancel,
}: BrandFormProps) {
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

      {/* ── Brand Name ─────────────────────────────────────────────────── */}
      <div>
        <label
          htmlFor="brandName"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Brand Name <span className="text-red-500">*</span>
        </label>
        <input
          id="brandName"
          name="brandName"
          type="text"
          required
          defaultValue={brand?.brandName ?? ""}
          placeholder="e.g. Peak Athletics"
          className={INPUT_CLASS}
        />
      </div>

      {/* ── Vendor Picker + Status ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
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
            defaultValue={brand?.vendorId ?? ""}
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
            defaultValue={brand?.status ?? BrandStatus.Active}
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

      {/* ── Internal Notes ─────────────────────────────────────────────── */}
      <div>
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
          defaultValue={brand?.internalNotes ?? ""}
          placeholder="Internal-only notes about this brand…"
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
            : brand
              ? "Save Changes"
              : "Create Brand"}
        </Button>
      </div>
    </form>
  );
}
