"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { Card, CardHeader } from "@/components/shell";
import { getContacts } from "../../contacts/actions";
import type { Contact } from "@twg/shared";

interface VendorContactsTabProps {
  vendorId: string;
}

export function VendorContactsTab({ vendorId }: VendorContactsTabProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getContacts(vendorId);
      setContacts(data);
    });
  }, [vendorId]);

  return (
    <Card>
      <CardHeader title="Vendor Contacts" />

      {contacts.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Users className="h-8 w-8 text-gray-300" />
          <p className="text-sm text-gray-500">No contacts on file.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-2 font-medium text-gray-600">Name</th>
                <th className="px-4 py-2 font-medium text-gray-600">Email</th>
                <th className="px-4 py-2 font-medium text-gray-600">Type</th>
                <th className="px-4 py-2 font-medium text-gray-600">Primary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/contacts/${c.id}`}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {c.lastName}, {c.firstName}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-gray-700">{c.email}</td>
                  <td className="px-4 py-2.5 capitalize text-gray-700">
                    {c.contactType}
                  </td>
                  <td className="px-4 py-2.5 text-gray-500">
                    {c.isPrimary ? "Yes" : "—"}
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
