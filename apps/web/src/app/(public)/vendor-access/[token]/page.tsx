import { VendorPageShell } from "@/components/vendor";

/**
 * Secure Access Landing Page — validates a one-time access token
 * and routes the vendor to the appropriate review experience.
 */
export default async function VendorAccessPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  // TODO: access link issuance/revocation — validate token from accessLinks collection
  // TODO: check link expiration, status, and scope
  // TODO: redirect to appropriate review page based on link type
  return (
    <VendorPageShell title="Secure Access">
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#6c757d", fontSize: "14px", marginBottom: "16px" }}>
          Validating your secure access link...
        </p>
        <p style={{ fontSize: "12px", color: "#adb5bd" }}>
          Token: {token}
        </p>
        <p style={{ marginTop: "24px", fontSize: "13px", color: "#6c757d" }}>
          {/* TODO: show loading state, then redirect or show error */}
          This page will verify your access and redirect you to the review package.
        </p>
      </div>
    </VendorPageShell>
  );
}
