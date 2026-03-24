import { VendorPageShell, VendorSummaryAction } from "@/components/vendor";

/**
 * Review Package Summary — the landing page for vendor review.
 * Shows overview of what's being offered and links to each section.
 */
export default async function ReviewPackageSummaryPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;
  return (
    <div>
      <VendorSummaryAction
        summary={
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
              Review Package
            </h2>
            <p style={{ fontSize: "14px", color: "#6c757d" }}>
              Package ID: {packageId}
            </p>
            <p style={{ fontSize: "14px", color: "#6c757d", marginTop: "4px" }}>
              Please review the following sections and accept or request changes.
            </p>
          </div>
        }
      />

      <VendorPageShell title="Sections">
        {/* TODO: dynamically list sections based on package layout */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {[
            { label: "Quote Review", href: "quote" },
            { label: "Approved Sites", href: "sites" },
            { label: "Agreement Review", href: "agreement" },
            { label: "Signature / Acceptance", href: "sign" },
          ].map((section) => (
            <li
              key={section.href}
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 500 }}>{section.label}</span>
              <span style={{ color: "#6c757d", fontSize: "12px" }}>Pending</span>
            </li>
          ))}
        </ul>
      </VendorPageShell>
    </div>
  );
}
