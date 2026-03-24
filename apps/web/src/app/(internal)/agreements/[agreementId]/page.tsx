import { PageHeader, TabShell, Card, CardHeader, StatusPill, FooterActionBar } from "@/components/shell";
import { Button } from "@/components/ui";

export default async function AgreementDetailPage({
  params,
}: {
  params: Promise<{ agreementId: string }>;
}) {
  const { agreementId } = await params;

  return (
    <div>
      <PageHeader
        title={`Agreement ${agreementId}`}
        description="Review and manage agreement details, signers, and acceptance."
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
                  <CardHeader title="Agreement Information" />
                  <dl className="space-y-3 text-sm">
                    {[
                      ["Agreement Number", agreementId],
                      ["Vendor", "—"],
                      ["Brand", "—"],
                      ["Linked Quote", "—"],
                      ["Owner", "—"],
                      ["Sent At", "—"],
                      ["Expires", "—"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <dt className="text-gray-500">{label}</dt>
                        <dd className="font-medium text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  {/* TODO: fetch agreement from Firestore */}
                </Card>
                <Card>
                  <CardHeader title="Signers" />
                  <p className="text-sm text-gray-500">No signers assigned.</p>
                  {/* TODO: list signer assignments and signature status */}
                </Card>
              </div>
            ),
          },
          {
            key: "terms",
            label: "Terms & Clauses",
            content: (
              <Card>
                <CardHeader title="Agreement Terms" />
                <p className="text-sm text-gray-500">No terms version linked.</p>
                {/* TODO: display full agreement terms content */}
              </Card>
            ),
          },
          {
            key: "sites",
            label: "Site Approvals",
            content: (
              <Card>
                <CardHeader title="Approved Sites" />
                <p className="text-sm text-gray-500">No site approvals linked.</p>
                {/* TODO: list site approvals for this agreement */}
              </Card>
            ),
          },
          {
            key: "versions",
            label: "Version History",
            content: (
              <Card>
                <CardHeader title="Agreement Versions" />
                <p className="text-sm text-gray-500">No versions recorded.</p>
                {/* TODO: list agreement version snapshots */}
              </Card>
            ),
          },
          {
            key: "acceptance",
            label: "Acceptance",
            content: (
              <Card>
                <CardHeader title="Acceptance Events" />
                <p className="text-sm text-gray-500">No acceptance events recorded.</p>
                {/* TODO: list acceptance events with IP, timestamp, user agent */}
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
                {/* TODO: fetch activity logs for this agreement */}
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
