"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Plus, Trash2 } from "lucide-react";
import { ContactType } from "@twg/shared";
import { Button } from "@/components/ui";
import { Card, CardHeader } from "@/components/shell";
import {
  getBrandContacts,
  assignContactToBrand,
  removeContactFromBrand,
} from "../assignment-actions";
import { getContacts } from "../../contacts/actions";

interface BrandContactsTabProps {
  brandId: string;
  canManage: boolean;
}

const TYPE_OPTIONS: { value: ContactType; label: string }[] = [
  { value: ContactType.Primary, label: "Primary" },
  { value: ContactType.Legal, label: "Legal" },
  { value: ContactType.Operations, label: "Operations" },
  { value: ContactType.Support, label: "Support" },
  { value: ContactType.Billing, label: "Billing" },
  { value: ContactType.Other, label: "Other" },
];

const INPUT_CLASS =
  "rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";

export function BrandContactsTab({ brandId, canManage }: BrandContactsTabProps) {
  const router = useRouter();
  const [assignments, setAssignments] = useState<
    Awaited<ReturnType<typeof getBrandContacts>>
  >([]);
  const [availableContacts, setAvailableContacts] = useState<
    { id: string; name: string }[]
  >([]);
  const [showAssign, setShowAssign] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState("");
  const [selectedType, setSelectedType] = useState<ContactType>(
    ContactType.Primary,
  );
  const [selectedPrimary, setSelectedPrimary] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getBrandContacts(brandId);
      setAssignments(data);
    });
  }, [brandId]);

  const handleOpenAssign = () => {
    setShowAssign(true);
    setError(null);
    startTransition(async () => {
      const contacts = await getContacts();
      const assignedIds = new Set(assignments.map((a) => a.contactId));
      setAvailableContacts(
        contacts
          .filter((c) => !assignedIds.has(c.id))
          .map((c) => ({ id: c.id, name: `${c.firstName} ${c.lastName}` })),
      );
    });
  };

  const handleAssign = () => {
    if (!selectedContactId) return;
    setError(null);
    startTransition(async () => {
      const result = await assignContactToBrand(
        brandId,
        selectedContactId,
        selectedType,
        selectedPrimary,
      );
      if (result.success) {
        setShowAssign(false);
        setSelectedContactId("");
        setSelectedPrimary(false);
        const data = await getBrandContacts(brandId);
        setAssignments(data);
        router.refresh();
      } else {
        setError(result.errors?.[0] ?? "Failed to assign contact.");
      }
    });
  };

  const handleRemove = (assignmentId: string) => {
    startTransition(async () => {
      const result = await removeContactFromBrand(assignmentId);
      if (result.success) {
        const data = await getBrandContacts(brandId);
        setAssignments(data);
        router.refresh();
      }
    });
  };

  return (
    <Card>
      <CardHeader
        title="Brand Contacts"
        actions={
          canManage && !showAssign ? (
            <Button size="sm" variant="secondary" onClick={handleOpenAssign}>
              <Plus className="h-3.5 w-3.5" />
              Assign Contact
            </Button>
          ) : undefined
        }
      />

      {/* Assign form */}
      {showAssign && canManage && (
        <div className="mb-4 rounded-md border border-gray-200 bg-gray-50 p-4">
          {error && (
            <p className="mb-3 text-sm text-red-600">{error}</p>
          )}
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="mb-1 block text-xs text-gray-500">
                Contact
              </label>
              <select
                value={selectedContactId}
                onChange={(e) => setSelectedContactId(e.target.value)}
                className={INPUT_CLASS}
              >
                <option value="">Select…</option>
                {availableContacts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-500">
                Role on Brand
              </label>
              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value as ContactType)
                }
                className={INPUT_CLASS}
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="assignPrimary"
                type="checkbox"
                checked={selectedPrimary}
                onChange={(e) => setSelectedPrimary(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
              />
              <label htmlFor="assignPrimary" className="text-xs text-gray-600">
                Primary
              </label>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleAssign}
                disabled={!selectedContactId || isLoading}
              >
                {isLoading ? "Saving…" : "Assign"}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setShowAssign(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Assignments list */}
      {assignments.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Users className="h-8 w-8 text-gray-300" />
          <p className="text-sm text-gray-500">
            No contacts assigned to this brand.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-2 font-medium text-gray-600">Contact</th>
                <th className="px-4 py-2 font-medium text-gray-600">Email</th>
                <th className="px-4 py-2 font-medium text-gray-600">Role</th>
                <th className="px-4 py-2 font-medium text-gray-600">Primary</th>
                {canManage && (
                  <th className="px-4 py-2 font-medium text-gray-600">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignments.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/contacts/${a.contactId}`}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {a.contactName}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-gray-700">
                    {a.contactEmail}
                  </td>
                  <td className="px-4 py-2.5 capitalize text-gray-700">
                    {a.contactType}
                  </td>
                  <td className="px-4 py-2.5 text-gray-500">
                    {a.isPrimary ? "Yes" : "—"}
                  </td>
                  {canManage && (
                    <td className="px-4 py-2.5">
                      <button
                        type="button"
                        onClick={() => handleRemove(a.id)}
                        className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                        aria-label="Remove assignment"
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
