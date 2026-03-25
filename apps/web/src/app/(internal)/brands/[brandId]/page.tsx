import { notFound } from "next/navigation";
import { PageHeader, TabShell, Card, CardHeader, StatusPill } from "@/components/shell";
import { requireInternalUser } from "@/lib/auth/session";
import { BrandStatus } from "@twg/shared";
import { getBrand, getVendorsForPicker } from "../actions";
import { getVendor } from "../../vendors/actions";
import { BrandDetailClient } from "./brand-detail-client";
import { BrandContactsTab } from "./brand-contacts-tab";

const STATUS_PILL_MAP: Record<
  BrandStatus,
  { label: string; variant: "green" | "gray" | "yellow" | "red" }
> = {
  [BrandStatus.Active]: { label: "Active", variant: "green" },
  [BrandStatus.Inactive]: { label: "Inactive", variant: "gray" },
  [BrandStatus.PendingApproval]: { label: "Pending Approval", variant: "yellow" },
  [BrandStatus.Archived]: { label: "Archived", variant: "red" },
};

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;
  const user = await requireInternalUser();
  const brand = await getBrand(brandId);

  if (!brand) notFound();

  const [vendor, vendors] = await Promise.all([
    getVendor(brand.vendorId),
    getVendorsForPicker(),
  ]);

  const canManage = user.category === "internal";
  const pill = STATUS_PILL_MAP[brand.status] ?? {
    label: brand.status,
    variant: "gray" as const,
  };

  return (
    <div>
      <PageHeader
        title={brand.brandName}
        description={vendor ? `Vendor: ${vendor.legalCompanyName}` : undefined}
        actions={<StatusPill label={pill.label} variant={pill.variant} />}
      />

      <TabShell
        tabs={[
          {
            key: "overview",
            label: "Overview",
            content: (
              <BrandDetailClient
                brand={brand}
                vendorName={vendor?.legalCompanyName ?? "Unknown"}
                vendors={vendors}
                canManage={canManage}
              />
            ),
          },
          {
            key: "contacts",
            label: "Contacts",
            content: (
              <BrandContactsTab brandId={brand.id} canManage={canManage} />
            ),
          },
          {
            key: "site-approvals",
            label: "Site Approvals",
            content: (
              <Card>
                <CardHeader title="Approved Sites" />
                <p className="text-sm text-gray-500">
                  No site approvals on record.
                </p>
              </Card>
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

      {brand.internalNotes && (
        <Card className="mt-6">
          <CardHeader title="Internal Notes" />
          <p className="whitespace-pre-wrap text-sm text-gray-700">
            {brand.internalNotes}
          </p>
        </Card>
      )}
    </div>
  );
}
