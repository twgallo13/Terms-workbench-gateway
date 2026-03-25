"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { Tags } from "lucide-react";
import { Card, CardHeader } from "@/components/shell";
import { getContactBrands } from "../../brands/assignment-actions";

interface ContactBrandsTabProps {
  contactId: string;
  canManage: boolean;
}

export function ContactBrandsTab({ contactId }: ContactBrandsTabProps) {
  const [assignments, setAssignments] = useState<
    Awaited<ReturnType<typeof getContactBrands>>
  >([]);
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getContactBrands(contactId);
      setAssignments(data);
    });
  }, [contactId]);

  return (
    <Card>
      <CardHeader title="Brand Assignments" />

      {assignments.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Tags className="h-8 w-8 text-gray-300" />
          <p className="text-sm text-gray-500">
            This contact is not assigned to any brands.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-2 font-medium text-gray-600">Brand</th>
                <th className="px-4 py-2 font-medium text-gray-600">Role</th>
                <th className="px-4 py-2 font-medium text-gray-600">Primary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignments.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/brands/${a.brandId}`}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {a.brandName}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 capitalize text-gray-700">
                    {a.contactType}
                  </td>
                  <td className="px-4 py-2.5 text-gray-500">
                    {a.isPrimary ? "Yes" : "—"}
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
