import { VendorPageShell } from "@/components/vendor";

/** Approved Sites Review — vendor sees which sites their brand is approved for */
export default async function SitesReviewPage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = await params;
  return (
    <VendorPageShell title="Approved Sites">
      {/* TODO: render site approvals from brand/quote snapshot */}
      <p style={{ color: "#6c757d", fontSize: "14px" }}>
        Your brand has been approved for the following sites.
      </p>
      <div style={{ marginTop: "16px", padding: "16px", background: "#f8f9fa", borderRadius: "8px" }}>
        <p style={{ fontSize: "13px", color: "#6c757d" }}>
          Site approvals will be listed here.
          <br />
          Package: {packageId}
        </p>
      </div>
    </VendorPageShell>
  );
}
