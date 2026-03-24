import { VendorPageShell } from "@/components/vendor";

export default function LoginPage() {
  return (
    <VendorPageShell title="Sign In">
      {/* TODO: implement Firebase Authentication — email link or email/password */}
      {/* TODO: auto-provision internal admins for @shiekhshoes.org domain */}
      {/* TODO: allowlist checks for other internal emails/domains */}
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <p style={{ color: "#6c757d", fontSize: "14px", marginBottom: "24px" }}>
          Sign in with your Shiekh email to access the platform.
        </p>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "4px" }}>
            Email
          </label>
          <input
            type="email"
            disabled
            placeholder="you@shiekhshoes.org"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #e2e8f0",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </div>
        <button
          disabled
          style={{
            width: "100%",
            padding: "10px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: "not-allowed",
            opacity: 0.6,
          }}
        >
          Continue
        </button>
        <p style={{ marginTop: "16px", fontSize: "12px", color: "#6c757d", textAlign: "center" }}>
          Vendor? Use the secure link provided to you by Shiekh.
        </p>
      </div>
    </VendorPageShell>
  );
}
