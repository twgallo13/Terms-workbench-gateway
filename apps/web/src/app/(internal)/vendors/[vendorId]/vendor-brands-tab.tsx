"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { Tags } from "lucide-react";
import { Card, CardHeader } from "@/components/shell";
import { getBrands } from "../../brands/actions";
import type { Brand } from "@twg/shared";

interface VendorBrandsTabProps {
  vendorId: string;
}

export function VendorBrandsTab({ vendorId }: VendorBrandsTabProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getBrands(undefined, vendorId);
      setBrands(data);
    });
  }, [vendorId]);

  return (
    <Card>
      <CardHeader title="Associated Brands" />

      {brands.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Tags className="h-8 w-8 text-gray-300" />
          <p className="text-sm text-gray-500">
            No brands linked to this vendor yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-2 font-medium text-gray-600">Brand Name</th>
                <th className="px-4 py-2 font-medium text-gray-600">Status</th>
                <th className="px-4 py-2 font-medium text-gray-600">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {brands.map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/brands/${b.id}`}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {b.brandName}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 capitalize text-gray-700">
                    {b.status.replace(/_/g, " ")}
                  </td>
                  <td className="px-4 py-2.5 text-gray-500">
                    {b.createdAt
                      ? new Date(b.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
