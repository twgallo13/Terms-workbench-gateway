import { PageHeader, TabShell, FooterActionBar } from "@/components/shell";

export default async function QuoteDetailPage({ params }: { params: Promise<{ quoteId: string }> }) {
  const { quoteId } = await params;
  return (
    <div>
      <PageHeader
        title="Quote Detail"
        description={`Quote ID: ${quoteId}`}
      />
      <TabShell
        tabs={[
          {
            key: "builder",
            label: "Quote Builder",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: quote builder — pricing profile, fees, services, site approvals, operational profile */}
                Quote builder placeholder.
              </div>
            ),
          },
          {
            key: "preview",
            label: "Preview",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: quote preview as vendor will see it */}
                Quote preview placeholder.
              </div>
            ),
          },
          {
            key: "versions",
            label: "Version History",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: quote version history from quoteVersions collection */}
                Version history placeholder.
              </div>
            ),
          },
          {
            key: "activity",
            label: "Activity",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: activity log for this quote */}
                Activity placeholder.
              </div>
            ),
          },
        ]}
      />
      <FooterActionBar>
        {/* TODO: Save Draft, Send to Vendor, etc. */}
        <button disabled style={{ padding: "8px 16px", fontSize: "13px" }}>Save Draft</button>
        <button disabled style={{ padding: "8px 16px", fontSize: "13px" }}>Send to Vendor</button>
      </FooterActionBar>
    </div>
  );
}
