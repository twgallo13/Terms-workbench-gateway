import { notFound } from "next/navigation";
import { PageHeader, TabShell, Card, CardHeader, StatusPill } from "@/components/shell";
import { requireInternalUser } from "@/lib/auth/session";
import { VendorStatus } from "@twg/shared";
import type { Address } from "@twg/shared";
import { getVendor } from "../actions";
import { VendorDetailClient } from "./vendor-detail-client";
import { VendorBrandsTab } from "./vendor-brands-tab";
import { VendorContactsTab } from "./vendor-contacts-tab";

const STATUS_PILL_MAP: Record<
  VendorStatus,
  { label: string; variant: "green" | "gray" | "yellow" | "red" }
> = {
  [VendorStatus.Active]: { label: "Active", variant: "green" },
  [VendorStatus.Inactive]: { label: "Inactive", variant: "gray" },
  [VendorStatus.Suspended]: { label: "Suspended", variant: "yellow" },
  [VendorStatus.Archived]: { label: "Archived", variant: "red" },
};

function AddressDisplay({ address, title }: { address?: Address; title: string }) {
  if (!address) {
    return (
      <Card>
        <CardHeader title={title} />
        <p className="text-sm text-gray-500">No address on file</p>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader title={title} />
      <address className="space-y-0.5 text-sm not-italic text-gray-700">
        <p>{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p>{address.country}</p>
      </address>
    </Card>
  );
}

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ vendorId: string }>;
}) {
  const { vendorId } = await params;
  const user = await requireInternalUser();
  const vendor = await getVendor(vendorId);

  if (!vendor) notFound();

  const canManage = user.category === "internal";
  const pill = STATUS_PILL_MAP[vendor.status] ?? { label: vendor.status, variant: "gray" as const };

  return (
    <div>
      <PageHeader
        title={vendor.legalCompanyName}
        description={vendor.dba ? `DBA: ${vendor.dba}` : undefined}
        actions={<StatusPill label={pill.label} variant={pill.variant} />}
      />

      <TabShell
        tabs={[
          {
            key: "overview",
            label: "Overview",
            content: (
              <VendorDetailClient vendor={vendor} canManage={canManage} />
            ),
          },
          {
            key: "company",
            label: "Company Info",
            content: (
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader title="Company Information" />
                  <dl className="space-y-3 text-sm">
                    {[
                      ["Legal Name", vendor.legalCompanyName],
                      ["DBA", vendor.dba ?? "—"],
                      ["Tax ID", vendor.taxId ?? "—"],
                      ["Website", vendor.website ?? "—"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <dt className="text-gray-500">{label}</dt>
                        <dd className="font-medium text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </Card>
                <div className="space-y-6">
                  <AddressDisplay
                    address={vendor.businessAddress}
                    title="Business Address"
                  />
                  <AddressDisplay
                    address={vendor.returnAddress}
                    title="Return Address"
                  />
                </div>
              </div>
            ),
          },
          {
            key: "brands",
            label: "Brands",
            content: <VendorBrandsTab vendorId={vendor.id} />,
          },
          {
            key: "contacts",
            label: "Contacts",
            content: <VendorContactsTab vendorId={vendor.id} />,
          },
          {
            key: "activity",
            label: "Activity",
            content: (
              <Card>
                <CardHeader title="Activity History" />
                <p className="text-sm text-gray-500">
                  Activity log entries will appear here.
                </p>
              </Card>
            ),
          },
        ]}
      />

      {vendor.internalNotes && (
        <Card className="mt-6">
          <CardHeader title="Internal Notes" />
          <p className="whitespace-pre-wrap text-sm text-gray-700">
            {vendor.internalNotes}
          </p>
        </Card>
      )}
    </div>
  );
}
