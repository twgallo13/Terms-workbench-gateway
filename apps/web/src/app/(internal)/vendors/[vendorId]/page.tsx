import { PageHeader, TabShell } from "@/components/shell";

export default async function VendorDetailPage({ params }: { params: Promise<{ vendorId: string }> }) {
  const { vendorId } = await params;
  return (
    <div>
      <PageHeader
        title="Vendor Detail"
        description={`Vendor ID: ${vendorId}`}
      />
      <TabShell
        tabs={[
          {
            key: "overview",
            label: "Overview",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: vendor overview — company info, contacts, addresses */}
                Vendor overview placeholder.
              </div>
            ),
          },
          {
            key: "brands",
            label: "Brands",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: list brands for this vendor */}
                Brands placeholder.
              </div>
            ),
          },
          {
            key: "contacts",
            label: "Contacts",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: contact directory for this vendor */}
                Contacts placeholder.
              </div>
            ),
          },
          {
            key: "quotes",
            label: "Quotes",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: quotes linked to this vendor */}
                Quotes placeholder.
              </div>
            ),
          },
          {
            key: "agreements",
            label: "Agreements",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: agreements linked to this vendor */}
                Agreements placeholder.
              </div>
            ),
          },
          {
            key: "activity",
            label: "Activity",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: activity log filtered to this vendor */}
                Activity placeholder.
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
