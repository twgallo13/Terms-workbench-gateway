import { notFound } from "next/navigation";
import { PageHeader, TabShell, Card, CardHeader, StatusPill } from "@/components/shell";
import { requireInternalUser } from "@/lib/auth/session";
import { ContactStatus } from "@twg/shared";
import { getContact } from "../actions";
import { getVendor } from "../../vendors/actions";
import { getVendorsForPicker } from "../../brands/actions";
import { ContactDetailClient } from "./contact-detail-client";
import { ContactBrandsTab } from "./contact-brands-tab";

const STATUS_PILL_MAP: Record<
  ContactStatus,
  { label: string; variant: "green" | "gray" }
> = {
  [ContactStatus.Active]: { label: "Active", variant: "green" },
  [ContactStatus.Inactive]: { label: "Inactive", variant: "gray" },
};

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ contactId: string }>;
}) {
  const { contactId } = await params;
  const user = await requireInternalUser();
  const contact = await getContact(contactId);

  if (!contact) notFound();

  const [vendor, vendors] = await Promise.all([
    getVendor(contact.vendorId),
    getVendorsForPicker(),
  ]);

  const canManage = user.category === "internal";
  const pill = STATUS_PILL_MAP[contact.status] ?? {
    label: contact.status,
    variant: "gray" as const,
  };

  return (
    <div>
      <PageHeader
        title={`${contact.firstName} ${contact.lastName}`}
        description={vendor ? `Vendor: ${vendor.legalCompanyName}` : undefined}
        actions={<StatusPill label={pill.label} variant={pill.variant} />}
      />

      <TabShell
        tabs={[
          {
            key: "overview",
            label: "Overview",
            content: (
              <ContactDetailClient
                contact={contact}
                vendorName={vendor?.legalCompanyName ?? "Unknown"}
                vendors={vendors}
                canManage={canManage}
              />
            ),
          },
          {
            key: "brand-assignments",
            label: "Brand Assignments",
            content: (
              <ContactBrandsTab contactId={contact.id} canManage={canManage} />
            ),
          },
          {
            key: "activity",
            label: "Activity",
            content: (
              <Card>
                <CardHeader title="Activity History" />
                <p className="text-sm text-gray-500">
                  No activity recorded.
                </p>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}
