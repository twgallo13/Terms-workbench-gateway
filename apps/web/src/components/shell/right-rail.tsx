import { type ReactNode } from "react";

/**
 * Right rail placeholder for contextual panels:
 * - Activity feed
 * - Tasks / action items
 * - Validation warnings
 * - Quick actions
 */
export function RightRail({ children }: { children?: ReactNode }) {
  return (
    <aside
      style={{
        width: "280px",
        borderLeft: "1px solid var(--color-border)",
        padding: "16px",
        background: "var(--color-bg)",
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      {children ?? (
        <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          {/* TODO: contextual activity feed, tasks, and validation warnings */}
          <p style={{ fontWeight: 600, marginBottom: "8px" }}>Activity</p>
          <p>No recent activity.</p>
        </div>
      )}
    </aside>
  );
}
