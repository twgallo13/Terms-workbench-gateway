import { VendorPageShell } from "@/components/vendor";

/** Quote Review — vendor sees pricing, fees, services */
export default async function QuoteReviewPage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = await params;
  return (
    <VendorPageShell title="Quote Review">
      {/* TODO: render quote data from snapshot — pricing, fees, services, operational expectations */}
      <p style={{ color: "#6c757d", fontSize: "14px" }}>
        Review the commercial terms proposed for your brand.
      </p>
      <div style={{ marginTop: "16px", padding: "16px", background: "#f8f9fa", borderRadius: "8px" }}>
        <p style={{ fontSize: "13px", color: "#6c757d" }}>
          Quote details will be rendered here.
          <br />
          Package: {packageId}
        </p>
      </div>
    </VendorPageShell>
  );
}
