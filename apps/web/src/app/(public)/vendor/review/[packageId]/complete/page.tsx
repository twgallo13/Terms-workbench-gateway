import { VendorPageShell } from "@/components/vendor";

/** Completion / Download Screen — post-acceptance confirmation and PDF download */
export default async function CompletePage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = await params;
  return (
    <VendorPageShell title="Acceptance Complete">
      {/* TODO: PDF generation — generate final signed PDF via Cloud Run service */}
      {/* TODO: provide download link from Cloud Storage */}
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
          Thank you for accepting the agreement.
        </h3>
        <p style={{ color: "#6c757d", fontSize: "14px", marginBottom: "24px" }}>
          Package: {packageId}
        </p>
        <p style={{ color: "#6c757d", fontSize: "14px", marginBottom: "16px" }}>
          A copy of your signed agreement will be available for download below.
        </p>
        <button
          disabled
          style={{
            padding: "10px 24px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "not-allowed",
            opacity: 0.6,
          }}
        >
          Download Signed Agreement (PDF)
        </button>
      </div>
    </VendorPageShell>
  );
}
