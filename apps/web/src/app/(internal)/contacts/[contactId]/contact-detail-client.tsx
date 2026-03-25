"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import type { Contact } from "@twg/shared";
import { Button } from "@/components/ui";
import { Card, CardHeader } from "@/components/shell";
import { ContactForm } from "../contact-form";
import { updateContact } from "../actions";

interface ContactDetailClientProps {
  contact: Contact;
  vendorName: string;
  vendors: { id: string; legalCompanyName: string }[];
  canManage: boolean;
}

export function ContactDetailClient({
  contact,
  vendorName,
  vendors,
  canManage,
}: ContactDetailClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing && canManage) {
    return (
      <Card>
        <CardHeader title="Edit Contact" />
        <ContactForm
          contact={contact}
          vendors={vendors}
          action={(formData) => updateContact(contact.id, formData)}
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
        title="Contact Overview"
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
          <dt className="text-gray-500">First Name</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {contact.firstName}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Last Name</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {contact.lastName}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Email</dt>
          <dd className="mt-0.5 font-medium text-gray-900">{contact.email}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Phone</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {contact.phone ?? "—"}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Job Title</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {contact.title ?? "—"}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Vendor</dt>
          <dd className="mt-0.5 font-medium text-gray-900">{vendorName}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Contact Type</dt>
          <dd className="mt-0.5 font-medium capitalize text-gray-900">
            {contact.contactType}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Status</dt>
          <dd className="mt-0.5 font-medium capitalize text-gray-900">
            {contact.status}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Primary Contact</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {contact.isPrimary ? "Yes" : "No"}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Created</dt>
          <dd className="mt-0.5 font-medium text-gray-900">
            {contact.createdAt
              ? new Date(contact.createdAt).toLocaleDateString()
              : "—"}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
