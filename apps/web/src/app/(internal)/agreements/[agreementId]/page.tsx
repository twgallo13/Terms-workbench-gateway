import { PageHeader, TabShell, FooterActionBar } from "@/components/shell";

export default async function AgreementDetailPage({ params }: { params: Promise<{ agreementId: string }> }) {
  const { agreementId } = await params;
  return (
    <div>
      <PageHeader
        title="Agreement Detail"
        description={`Agreement ID: ${agreementId}`}
      />
      <TabShell
        tabs={[
          {
            key: "builder",
            label: "Agreement Builder",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: agreement builder — terms, clauses, package layout, signer assignment */}
                Agreement builder placeholder.
              </div>
            ),
          },
          {
            key: "preview",
            label: "Preview",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: agreement preview as vendor will see it */}
                Agreement preview placeholder.
              </div>
            ),
          },
          {
            key: "signers",
            label: "Signers",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: signer assignments and acceptance status */}
                Signers placeholder.
              </div>
            ),
          },
          {
            key: "versions",
            label: "Version History",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: agreement version history from agreementVersions */}
                Version history placeholder.
              </div>
            ),
          },
          {
            key: "activity",
            label: "Activity",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: activity log for this agreement */}
                Activity placeholder.
              </div>
            ),
          },
        ]}
      />
      <FooterActionBar>
        {/* TODO: Save Draft, Generate Access Link, Send, etc. */}
        <button disabled style={{ padding: "8px 16px", fontSize: "13px" }}>Save Draft</button>
        <button disabled style={{ padding: "8px 16px", fontSize: "13px" }}>Generate Access Link</button>
        <button disabled style={{ padding: "8px 16px", fontSize: "13px" }}>Send to Vendor</button>
      </FooterActionBar>
    </div>
  );
}
