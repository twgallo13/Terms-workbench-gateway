import { type ReactNode } from "react";

/**
 * Simple review layout for vendor-facing pages.
 * Mobile-friendly, clean neutral visual structure.
 */
export function VendorReviewLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "18px", color: "#1a1a2e" }}>
          Terms Workbench Gateway
        </span>
      </header>
      <main
        style={{
          flex: 1,
          padding: "24px 16px",
          maxWidth: "720px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {children}
      </main>
      <footer
        style={{
          borderTop: "1px solid #e2e8f0",
          padding: "16px 24px",
          textAlign: "center",
          color: "#6c757d",
          fontSize: "12px",
          background: "#ffffff",
        }}
      >
        &copy; Shiekh Shoes — Terms Workbench Gateway
      </footer>
    </div>
  );
}
