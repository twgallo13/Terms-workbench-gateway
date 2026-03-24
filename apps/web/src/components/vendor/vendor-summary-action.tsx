import { type ReactNode } from "react";

/**
 * Summary/action area for vendor review pages.
 * Shows key info and primary call-to-action.
 */
export function VendorSummaryAction({
  summary,
  actions,
}: {
  summary: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div
      style={{
        background: "#f8f9fa",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginBottom: "16px",
      }}
    >
      <div>{summary}</div>
      {actions && (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>{actions}</div>
      )}
    </div>
  );
}
