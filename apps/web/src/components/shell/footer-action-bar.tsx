import { type ReactNode } from "react";

/**
 * Footer action bar placeholder — sticky bottom bar for primary page actions.
 * Used on builder/detail pages for Save, Submit, Cancel, etc.
 */
export function FooterActionBar({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        borderTop: "1px solid var(--color-border)",
        padding: "12px 24px",
        background: "var(--color-bg)",
        display: "flex",
        justifyContent: "flex-end",
        gap: "8px",
      }}
    >
      {children ?? (
        <>
          {/* TODO: dynamic page actions (Save, Submit, Cancel, etc.) */}
          <button disabled style={{ padding: "8px 16px", fontSize: "13px" }}>
            Cancel
          </button>
          <button disabled style={{ padding: "8px 16px", fontSize: "13px" }}>
            Save
          </button>
        </>
      )}
    </div>
  );
}
