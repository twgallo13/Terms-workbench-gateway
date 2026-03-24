import { VendorPageShell } from "@/components/vendor";

/** Agreement Review — vendor sees full agreement terms, clauses, and legal content */
export default async function AgreementReviewPage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = await params;
  return (
    <VendorPageShell title="Agreement Review">
      {/* TODO: render agreement content from snapshot — terms, clauses, operational expectations */}
      <p style={{ color: "#6c757d", fontSize: "14px" }}>
        Review the full agreement terms below.
      </p>
      <div style={{ marginTop: "16px", padding: "16px", background: "#f8f9fa", borderRadius: "8px" }}>
        <p style={{ fontSize: "13px", color: "#6c757d" }}>
          Agreement content will be rendered here.
          <br />
          Package: {packageId}
        </p>
      </div>
    </VendorPageShell>
  );
}
