import { PageHeader, TabShell } from "@/components/shell";

export default async function BrandDetailPage({ params }: { params: Promise<{ brandId: string }> }) {
  const { brandId } = await params;
  return (
    <div>
      <PageHeader
        title="Brand Workspace"
        description={`Brand ID: ${brandId}`}
      />
      <TabShell
        tabs={[
          {
            key: "overview",
            label: "Overview",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: brand overview — vendor, status, internal notes */}
                Brand overview placeholder.
              </div>
            ),
          },
          {
            key: "sites",
            label: "Approved Sites",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: site approvals for this brand */}
                Site approvals placeholder.
              </div>
            ),
          },
          {
            key: "contacts",
            label: "Contacts",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: contacts assigned to this brand */}
                Brand contacts placeholder.
              </div>
            ),
          },
          {
            key: "quote",
            label: "Quote",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: current quote for this brand (one per vendor+brand) */}
                Quote placeholder.
              </div>
            ),
          },
          {
            key: "agreement",
            label: "Agreement",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: current agreement for this brand (one per vendor+brand) */}
                Agreement placeholder.
              </div>
            ),
          },
          {
            key: "handoff",
            label: "WB Handoff",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: WB handoff status and checklist for this brand */}
                WB Handoff placeholder.
              </div>
            ),
          },
          {
            key: "activity",
            label: "Activity",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: activity log filtered to this brand */}
                Activity placeholder.
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
