import { type ReactNode } from "react";

/**
 * Mobile-friendly page shell for public/vendor pages.
 */
export function VendorPageShell({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        padding: "24px",
        marginBottom: "16px",
      }}
    >
      {title && (
        <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>{title}</h2>
      )}
      {children}
    </div>
  );
}
