"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Pencil, Plus } from "lucide-react";
import { VendorStatus } from "@twg/shared";
import type { Vendor } from "@twg/shared";
import { Button } from "@/components/ui";
import { Card, StatusPill } from "@/components/shell";
import { VendorForm } from "./vendor-form";
import { createVendor, updateVendor, getVendors } from "./actions";

interface VendorsTableProps {
  vendors: Vendor[];
  canManage: boolean;
}

const STATUS_PILL_MAP: Record<
  VendorStatus,
  { label: string; variant: "green" | "gray" | "yellow" | "red" }
> = {
  [VendorStatus.Active]: { label: "Active", variant: "green" },
  [VendorStatus.Inactive]: { label: "Inactive", variant: "gray" },
  [VendorStatus.Suspended]: { label: "Suspended", variant: "yellow" },
  [VendorStatus.Archived]: { label: "Archived", variant: "red" },
};

const STATUS_FILTER_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: VendorStatus.Active, label: "Active" },
  { value: VendorStatus.Inactive, label: "Inactive" },
  { value: VendorStatus.Suspended, label: "Suspended" },
  { value: VendorStatus.Archived, label: "Archived" },
];

export function VendorsTable({ vendors: initialVendors, canManage }: VendorsTableProps) {
  const router = useRouter();
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [vendors, setVendors] = useState(initialVendors);
  const [isFiltering, startFilterTransition] = useTransition();

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    startFilterTransition(async () => {
      const filtered = await getVendors(
        value ? (value as VendorStatus) : undefined,
      );
      setVendors(filtered);
    });
  };

  const colCount = canManage ? 6 : 5;

  return (
    <>
      {/* Create form */}
      {showCreate && canManage && (
        <Card className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            New Vendor
          </h3>
          <VendorForm
            action={createVendor}
            onSuccess={() => {
              setShowCreate(false);
              router.refresh();
            }}
            onCancel={() => setShowCreate(false)}
          />
        </Card>
      )}

      <Card padding={false}>
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
              disabled={isFiltering}
            >
              {STATUS_FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {isFiltering && (
              <span className="text-xs text-gray-400">Loading…</span>
            )}
          </div>
          {canManage && !showCreate && (
            <Button size="sm" onClick={() => setShowCreate(true)}>
              <Plus className="h-4 w-4" />
              New Vendor
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 font-medium text-gray-600">
                  Legal Name
                </th>
                <th className="px-5 py-3 font-medium text-gray-600">DBA</th>
                <th className="px-5 py-3 font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 font-medium text-gray-600">
                  Website
                </th>
                <th className="px-5 py-3 font-medium text-gray-600">
                  Created
                </th>
                {canManage && (
                  <th className="px-5 py-3 font-medium text-gray-600">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  {editingId === vendor.id ? (
                    <td colSpan={colCount} className="px-5 py-4">
                      <VendorForm
                        vendor={vendor}
                        action={(formData) =>
                          updateVendor(vendor.id, formData)
                        }
                        onSuccess={() => {
                          setEditingId(null);
                          router.refresh();
                        }}
                        onCancel={() => setEditingId(null)}
                      />
                    </td>
                  ) : (
                    <>
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/vendors/${vendor.id}`}
                          className="flex items-center gap-3 hover:underline"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                            <Building2 className="h-4 w-4 text-gray-500" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {vendor.legalCompanyName}
                          </span>
                        </Link>
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">
                        {vendor.dba ?? "—"}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusPill
                          label={
                            STATUS_PILL_MAP[vendor.status]?.label ??
                            vendor.status
                          }
                          variant={
                            STATUS_PILL_MAP[vendor.status]?.variant ?? "gray"
                          }
                        />
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">
                        {vendor.website ?? "—"}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">
                        {vendor.createdAt
                          ? new Date(vendor.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      {canManage && (
                        <td className="px-5 py-3.5">
                          <button
                            type="button"
                            onClick={() => setEditingId(vendor.id)}
                            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            aria-label={`Edit ${vendor.legalCompanyName}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}

              {vendors.length === 0 && (
                <tr>
                  <td colSpan={colCount} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Building2 className="h-8 w-8 text-gray-300" />
                      <p className="text-sm font-medium text-gray-900">
                        No vendors yet
                      </p>
                      <p className="text-sm text-gray-500">
                        Create your first vendor to get started.
                      </p>
                      {canManage && (
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => setShowCreate(true)}
                        >
                          <Plus className="h-4 w-4" />
                          New Vendor
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
