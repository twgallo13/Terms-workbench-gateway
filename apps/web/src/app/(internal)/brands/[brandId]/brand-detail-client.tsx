"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import type { Brand } from "@twg/shared";
import { Button } from "@/components/ui";
import { Card, CardHeader } from "@/components/shell";
import { BrandForm } from "../brand-form";
import { updateBrand } from "../actions";

interface BrandDetailClientProps {
  brand: Brand;
  vendorName: string;
  vendors: { id: string; legalCompanyName: string }[];
  canManage: boolean;
}

export function BrandDetailClient({
  brand,
  vendorName,
  vendors,
  canManage,
}: BrandDetailClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing && canManage) {
    return (
      <Card>
        <CardHeader title="Edit Brand" />
        <BrandForm
          brand={brand}
          vendors={vendors}
          action={(formData) => updateBrand(brand.id, formData)}
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
        title="Brand Overview"
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
          <dt className="text-gray-500">Brand Name</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {brand.brandName}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Vendor</dt>
          <dd className="mt-0.5 font-medium text-gray-900">{vendorName}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Status</dt>
          <dd className="mt-0.5 font-medium capitalize text-gray-900">
            {brand.status.replace(/_/g, " ")}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Created</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {brand.createdAt
              ? new Date(brand.createdAt).toLocaleDateString()
              : "—"}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
