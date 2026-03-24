import { type ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "24px",
      }}
    >
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: 600, margin: 0 }}>{title}</h1>
        {description && (
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "4px" }}>
            {description}
          </p>
        )}
      </div>
      {actions && <div style={{ display: "flex", gap: "8px" }}>{actions}</div>}
    </div>
  );
}
