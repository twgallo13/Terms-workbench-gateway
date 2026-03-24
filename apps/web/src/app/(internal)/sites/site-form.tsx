"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { SiteStatus } from "@twg/shared";
import type { Site } from "@twg/shared";
import type { ActionResult } from "./actions";

interface SiteFormProps {
  site?: Site;
  action: (formData: FormData) => Promise<ActionResult>;
  onSuccess?: () => void;
  onCancel: () => void;
}

async function formAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  // The actual action is bound via the component; this is the wrapper shape.
  // We extract the bound action from the hidden field.
  return { success: false, errors: ["Unexpected error."] };
}

export function SiteForm({ site, action, onSuccess, onCancel }: SiteFormProps) {
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
    <form action={submitAction} className="space-y-4">
      {state?.errors && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
          {state.errors.map((err) => (
            <p key={err} className="text-sm text-red-700">
              {err}
            </p>
          ))}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Site Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={site?.name ?? ""}
          placeholder="e.g. Shiekh.com"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
        />
      </div>

      <div>
        <label
          htmlFor="displayLabel"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Display Label <span className="text-red-500">*</span>
        </label>
        <input
          id="displayLabel"
          name="displayLabel"
          type="text"
          required
          defaultValue={site?.displayLabel ?? ""}
          placeholder="e.g. Shiekh.com"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
        />
      </div>

      <div>
        <label
          htmlFor="domain"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Domain <span className="text-red-500">*</span>
        </label>
        <input
          id="domain"
          name="domain"
          type="text"
          required
          defaultValue={site?.domain ?? ""}
          placeholder="e.g. shiekh.com"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
            defaultValue={site?.status ?? SiteStatus.Active}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
          >
            <option value={SiteStatus.Active}>Active</option>
            <option value={SiteStatus.Inactive}>Inactive</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="sortOrder"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Sort Order
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={site?.sortOrder ?? 0}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
          />
        </div>
      </div>

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
          {isPending ? "Saving…" : site ? "Save Changes" : "Create Site"}
        </Button>
      </div>
    </form>
  );
}
