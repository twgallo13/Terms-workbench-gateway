import { PageHeader, TabShell, Card, CardHeader, StatusPill, FooterActionBar } from "@/components/shell";
import { Button } from "@/components/ui";

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ vendorId: string }>;
}) {
  const { vendorId } = await params;

  return (
    <div>
      <PageHeader
        title="Vendor Detail"
        description={`Vendor ID: ${vendorId}`}
        actions={<StatusPill label="Active" variant="green" />}
      />

      <TabShell
        tabs={[
          {
            key: "overview",
            label: "Overview",
            content: (
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader title="Company Information" />
                  <dl className="space-y-3 text-sm">
                    {[
                      ["Legal Name", "—"],
                      ["DBA", "—"],
                      ["Tax ID", "—"],
                      ["Website", "—"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <dt className="text-gray-500">{label}</dt>
                        <dd className="font-medium text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  {/* TODO: fetch vendor document from Firestore */}
                </Card>
                <Card>
                  <CardHeader title="Business Address" />
                  <p className="text-sm text-gray-500">No address on file</p>
                  {/* TODO: display vendor address */}
                </Card>
              </div>
            ),
          },
          {
            key: "brands",
            label: "Brands",
            content: (
              <Card>
                <CardHeader title="Associated Brands" />
                <p className="text-sm text-gray-500">
                  No brands linked to this vendor yet.
                </p>
                {/* TODO: list brands for this vendor */}
              </Card>
            ),
          },
          {
            key: "contacts",
            label: "Contacts",
            content: (
              <Card>
                <CardHeader title="Vendor Contacts" />
                <p className="text-sm text-gray-500">
                  No contacts on file.
                </p>
                {/* TODO: list contacts for this vendor */}
              </Card>
            ),
          },
          {
            key: "quotes",
            label: "Quotes",
            content: (
              <Card>
                <CardHeader title="Linked Quotes" />
                <p className="text-sm text-gray-500">
                  No quotes associated with this vendor.
                </p>
                {/* TODO: list quotes for this vendor */}
              </Card>
            ),
          },
          {
            key: "agreements",
            label: "Agreements",
            content: (
              <Card>
                <CardHeader title="Linked Agreements" />
                <p className="text-sm text-gray-500">
                  No agreements associated with this vendor.
                </p>
                {/* TODO: list agreements for this vendor */}
              </Card>
            ),
          },
          {
            key: "documents",
            label: "Documents",
            content: (
              <Card>
                <CardHeader title="Uploaded Documents" />
                <p className="text-sm text-gray-500">
                  No documents uploaded.
                </p>
                {/* TODO: list documents for this vendor */}
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
                  No activity recorded yet.
                </p>
                {/* TODO: fetch activity logs for this vendor */}
              </Card>
            ),
          },
        ]}
      />

      <FooterActionBar>
        <Button variant="secondary" disabled>
          Cancel
        </Button>
        <Button disabled>Save Changes</Button>
      </FooterActionBar>
    </div>
  );
}
