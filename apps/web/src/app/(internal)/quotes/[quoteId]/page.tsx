import { PageHeader, TabShell, Card, CardHeader, StatusPill, FooterActionBar } from "@/components/shell";
import { Button } from "@/components/ui";

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ quoteId: string }>;
}) {
  const { quoteId } = await params;

  return (
    <div>
      <PageHeader
        title={`Quote ${quoteId}`}
        description="Review and manage quote details, pricing, and terms."
        actions={<StatusPill label="Draft" variant="gray" />}
      />

      <TabShell
        tabs={[
          {
            key: "details",
            label: "Details",
            content: (
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader title="Quote Information" />
                  <dl className="space-y-3 text-sm">
                    {[
                      ["Quote Number", quoteId],
                      ["Vendor", "—"],
                      ["Brand", "—"],
                      ["Owner", "—"],
                      ["Expires", "—"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <dt className="text-gray-500">{label}</dt>
                        <dd className="font-medium text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  {/* TODO: fetch quote from Firestore */}
                </Card>
                <Card>
                  <CardHeader title="Pricing Profile" />
                  <p className="text-sm text-gray-500">No pricing profile assigned.</p>
                  {/* TODO: display linked pricing profile details */}
                </Card>
              </div>
            ),
          },
          {
            key: "terms",
            label: "Terms",
            content: (
              <Card>
                <CardHeader title="Terms Version" />
                <p className="text-sm text-gray-500">No terms version linked.</p>
                {/* TODO: display linked terms version */}
              </Card>
            ),
          },
          {
            key: "sites",
            label: "Site Approvals",
            content: (
              <Card>
                <CardHeader title="Approved Sites" />
                <p className="text-sm text-gray-500">No site approvals selected.</p>
                {/* TODO: list site approvals for this quote */}
              </Card>
            ),
          },
          {
            key: "versions",
            label: "Version History",
            content: (
              <Card>
                <CardHeader title="Quote Versions" />
                <p className="text-sm text-gray-500">No versions recorded.</p>
                {/* TODO: list quote version snapshots */}
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
                {/* TODO: fetch activity logs for this quote */}
              </Card>
            ),
          },
        ]}
      />

      <FooterActionBar>
        <Button variant="secondary" disabled>Cancel</Button>
        <Button variant="secondary" disabled>Send to Vendor</Button>
        <Button disabled>Save Changes</Button>
      </FooterActionBar>
    </div>
  );
}
