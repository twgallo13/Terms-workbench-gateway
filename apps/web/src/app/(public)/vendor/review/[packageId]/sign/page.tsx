import { VendorPageShell } from "@/components/vendor";

/** Signature / Acceptance Screen — vendor accepts or rejects the package */
export default async function SignPage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = await params;
  return (
    <VendorPageShell title="Signature / Acceptance">
      {/* TODO: final signature verification — capture acceptance evidence */}
      {/* TODO: record IP, user agent, timestamp, terms version */}
      {/* TODO: create acceptanceEvent and lock agreement version */}
      <p style={{ color: "#6c757d", fontSize: "14px", marginBottom: "16px" }}>
        By accepting below, you confirm that you have reviewed all terms and agree to the
        conditions set forth in this agreement package.
      </p>
      <div style={{ marginTop: "16px", padding: "16px", background: "#f8f9fa", borderRadius: "8px" }}>
        <p style={{ fontSize: "13px", color: "#6c757d", marginBottom: "12px" }}>
          Package: {packageId}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            disabled
            style={{
              padding: "10px 24px",
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "not-allowed",
              opacity: 0.6,
            }}
          >
            Accept & Sign
          </button>
          <button
            disabled
            style={{
              padding: "10px 24px",
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "not-allowed",
              opacity: 0.6,
            }}
          >
            Request Changes
          </button>
        </div>
      </div>
    </VendorPageShell>
  );
}
