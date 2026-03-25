"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import type { Vendor } from "@twg/shared";
import { Button } from "@/components/ui";
import { Card, CardHeader } from "@/components/shell";
import { VendorForm } from "../vendor-form";
import { updateVendor } from "../actions";

interface VendorDetailClientProps {
  vendor: Vendor;
  canManage: boolean;
}

export function VendorDetailClient({
  vendor,
  canManage,
}: VendorDetailClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing && canManage) {
    return (
      <Card>
        <CardHeader title="Edit Vendor" />
        <VendorForm
          vendor={vendor}
          action={(formData) => updateVendor(vendor.id, formData)}
          onSuccess={() => {
            setIsEditing(false);
            router.refresh();
          }}
          onCancel={() => setIsEditing(false)}
        />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title="Vendor Overview"
        actions={
          canManage ? (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
          ) : undefined
        }
      />
      <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-gray-500">Legal Company Name</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {vendor.legalCompanyName}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">DBA</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {vendor.dba ?? "—"}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Tax ID</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {vendor.taxId ?? "—"}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Website</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {vendor.website ?? "—"}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Status</dt>
          <dd className="mt-0.5 font-medium capitalize text-gray-900">
            {vendor.status}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Created</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {vendor.createdAt
              ? new Date(vendor.createdAt).toLocaleDateString()
              : "—"}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
