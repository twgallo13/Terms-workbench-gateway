"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tags, Pencil, Plus } from "lucide-react";
import { BrandStatus } from "@twg/shared";
import type { Brand } from "@twg/shared";
import { Button } from "@/components/ui";
import { Card, StatusPill } from "@/components/shell";
import { BrandForm } from "./brand-form";
import { createBrand, updateBrand, getBrands } from "./actions";

interface BrandsTableProps {
  brands: Brand[];
  vendors: { id: string; legalCompanyName: string }[];
  canManage: boolean;
}

const STATUS_PILL_MAP: Record<
  BrandStatus,
  { label: string; variant: "green" | "gray" | "yellow" | "red" }
> = {
  [BrandStatus.Active]: { label: "Active", variant: "green" },
  [BrandStatus.Inactive]: { label: "Inactive", variant: "gray" },
  [BrandStatus.PendingApproval]: { label: "Pending Approval", variant: "yellow" },
  [BrandStatus.Archived]: { label: "Archived", variant: "red" },
};

const STATUS_FILTER_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: BrandStatus.Active, label: "Active" },
  { value: BrandStatus.Inactive, label: "Inactive" },
  { value: BrandStatus.PendingApproval, label: "Pending Approval" },
  { value: BrandStatus.Archived, label: "Archived" },
];

export function BrandsTable({
  brands: initialBrands,
  vendors,
  canManage,
}: BrandsTableProps) {
  const router = useRouter();
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [brands, setBrands] = useState(initialBrands);
  const [isFiltering, startFilterTransition] = useTransition();

  // Build a vendor name lookup
  const vendorMap = new Map(vendors.map((v) => [v.id, v.legalCompanyName]));

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    startFilterTransition(async () => {
      const filtered = await getBrands(
        value ? (value as BrandStatus) : undefined,
      );
      setBrands(filtered);
    });
  };

  const colCount = canManage ? 5 : 4;

  return (
    <>
      {/* Create form */}
      {showCreate && canManage && (
        <Card className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            New Brand
          </h3>
          <BrandForm
            vendors={vendors}
            action={createBrand}
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
              New Brand
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 font-medium text-gray-600">
                  Brand Name
                </th>
                <th className="px-5 py-3 font-medium text-gray-600">Vendor</th>
                <th className="px-5 py-3 font-medium text-gray-600">Status</th>
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
              {brands.map((brand) => (
                <tr key={brand.id}>
                  {editingId === brand.id ? (
                    <td colSpan={colCount} className="px-5 py-4">
                      <BrandForm
                        brand={brand}
                        vendors={vendors}
                        action={(formData) => updateBrand(brand.id, formData)}
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
                          href={`/brands/${brand.id}`}
                          className="flex items-center gap-3 hover:underline"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                            <Tags className="h-4 w-4 text-gray-500" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {brand.brandName}
                          </span>
                        </Link>
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">
                        {vendorMap.get(brand.vendorId) ?? "—"}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusPill
                          label={
                            STATUS_PILL_MAP[brand.status]?.label ?? brand.status
                          }
                          variant={
                            STATUS_PILL_MAP[brand.status]?.variant ?? "gray"
                          }
                        />
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">
                        {brand.createdAt
                          ? new Date(brand.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      {canManage && (
                        <td className="px-5 py-3.5">
                          <button
                            type="button"
                            onClick={() => setEditingId(brand.id)}
                            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            aria-label={`Edit ${brand.brandName}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}

              {brands.length === 0 && (
                <tr>
                  <td colSpan={colCount} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Tags className="h-8 w-8 text-gray-300" />
                      <p className="text-sm font-medium text-gray-900">
                        No brands yet
                      </p>
                      <p className="text-sm text-gray-500">
                        Create your first brand to get started.
                      </p>
                      {canManage && (
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => setShowCreate(true)}
                        >
                          <Plus className="h-4 w-4" />
                          New Brand
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
