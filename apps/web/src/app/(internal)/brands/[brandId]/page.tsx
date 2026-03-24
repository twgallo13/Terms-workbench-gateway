import { PageHeader, TabShell, Card, CardHeader, StatusPill, FooterActionBar } from "@/components/shell";
import { Button } from "@/components/ui";

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;

  return (
    <div>
      <PageHeader
        title="Brand Detail"
        description={`Brand ID: ${brandId}`}
        actions={<StatusPill label="Active" variant="green" />}
      />

      <TabShell
        tabs={[
          {
            key: "overview",
            label: "Overview",
            content: (
              <Card>
                <CardHeader title="Brand Information" />
                <dl className="space-y-3 text-sm">
                  {[
                    ["Brand Name", "—"],
                    ["Parent Vendor", "—"],
                    ["Internal Notes", "—"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <dt className="text-gray-500">{label}</dt>
                      <dd className="font-medium text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
                {/* TODO: fetch brand document from Firestore */}
              </Card>
            ),
          },
          {
            key: "contacts",
            label: "Contacts",
            content: (
              <Card>
                <CardHeader title="Brand Contacts" />
                <p className="text-sm text-gray-500">No contacts assigned to this brand.</p>
                {/* TODO: list brand contact assignments */}
              </Card>
            ),
          },
          {
            key: "site-approvals",
            label: "Site Approvals",
            content: (
              <Card>
                <CardHeader title="Approved Sites" />
                <p className="text-sm text-gray-500">No site approvals on record.</p>
                {/* TODO: list site approvals for this brand */}
              </Card>
            ),
          },
          {
            key: "activity",
            label: "Activity",
            content: (
              <Card>
                <CardHeader title="Activity History" />
                <p className="text-sm text-gray-500">No activity recorded.</p>
                {/* TODO: fetch activity logs for this brand */}
              </Card>
            ),
          },
        ]}
      />

      <FooterActionBar>
        <Button variant="secondary" disabled>Cancel</Button>
        <Button disabled>Save Changes</Button>
      </FooterActionBar>
    </div>
  );
}
