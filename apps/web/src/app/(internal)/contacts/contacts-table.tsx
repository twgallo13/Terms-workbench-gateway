"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Pencil, Plus } from "lucide-react";
import { ContactStatus } from "@twg/shared";
import type { Contact } from "@twg/shared";
import { Button } from "@/components/ui";
import { Card, StatusPill } from "@/components/shell";
import { ContactForm } from "./contact-form";
import { createContact, updateContact, getContacts } from "./actions";

interface ContactsTableProps {
  contacts: Contact[];
  vendors: { id: string; legalCompanyName: string }[];
  canManage: boolean;
}

const STATUS_PILL_MAP: Record<
  ContactStatus,
  { label: string; variant: "green" | "gray" }
> = {
  [ContactStatus.Active]: { label: "Active", variant: "green" },
  [ContactStatus.Inactive]: { label: "Inactive", variant: "gray" },
};

const STATUS_FILTER_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: ContactStatus.Active, label: "Active" },
  { value: ContactStatus.Inactive, label: "Inactive" },
];

export function ContactsTable({
  contacts: initialContacts,
  vendors,
  canManage,
}: ContactsTableProps) {
  const router = useRouter();
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [contacts, setContacts] = useState(initialContacts);
  const [isFiltering, startFilterTransition] = useTransition();

  const vendorMap = new Map(vendors.map((v) => [v.id, v.legalCompanyName]));

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    startFilterTransition(async () => {
      const filtered = await getContacts(
        undefined,
        value ? (value as ContactStatus) : undefined,
      );
      setContacts(filtered);
    });
  };

  const colCount = canManage ? 7 : 6;

  return (
    <>
      {/* Create form */}
      {showCreate && canManage && (
        <Card className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            New Contact
          </h3>
          <ContactForm
            vendors={vendors}
            action={createContact}
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
              New Contact
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 font-medium text-gray-600">Name</th>
                <th className="px-5 py-3 font-medium text-gray-600">Email</th>
                <th className="px-5 py-3 font-medium text-gray-600">Vendor</th>
                <th className="px-5 py-3 font-medium text-gray-600">Type</th>
                <th className="px-5 py-3 font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 font-medium text-gray-600">
                  Primary?
                </th>
                {canManage && (
                  <th className="px-5 py-3 font-medium text-gray-600">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  {editingId === contact.id ? (
                    <td colSpan={colCount} className="px-5 py-4">
                      <ContactForm
                        contact={contact}
                        vendors={vendors}
                        action={(formData) =>
                          updateContact(contact.id, formData)
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
                          href={`/contacts/${contact.id}`}
                          className="flex items-center gap-3 hover:underline"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                            <Users className="h-4 w-4 text-gray-500" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {contact.lastName}, {contact.firstName}
                          </span>
                        </Link>
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">
                        {contact.email}
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">
                        {vendorMap.get(contact.vendorId) ?? "—"}
                      </td>
                      <td className="px-5 py-3.5 capitalize text-gray-700">
                        {contact.contactType}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusPill
                          label={
                            STATUS_PILL_MAP[contact.status]?.label ??
                            contact.status
                          }
                          variant={
                            STATUS_PILL_MAP[contact.status]?.variant ?? "gray"
                          }
                        />
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">
                        {contact.isPrimary ? "Yes" : "—"}
                      </td>
                      {canManage && (
                        <td className="px-5 py-3.5">
                          <button
                            type="button"
                            onClick={() => setEditingId(contact.id)}
                            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            aria-label={`Edit ${contact.firstName} ${contact.lastName}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}

              {contacts.length === 0 && (
                <tr>
                  <td colSpan={colCount} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="h-8 w-8 text-gray-300" />
                      <p className="text-sm font-medium text-gray-900">
                        No contacts yet
                      </p>
                      <p className="text-sm text-gray-500">
                        Create your first contact to get started.
                      </p>
                      {canManage && (
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => setShowCreate(true)}
                        >
                          <Plus className="h-4 w-4" />
                          New Contact
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
