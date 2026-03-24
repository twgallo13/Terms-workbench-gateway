import { PageHeader } from "@/components/shell";

export default function ActivityLogPage() {
  return (
    <div>
      <PageHeader
        title="Activity Log"
        description="Audit trail of all system events — creates, updates, views, sends, signatures."
      />
      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px" }}>
        {/* TODO: activity log table with event type, actor, target, timestamp */}
        {/* TODO: activity/audit event creation — implemented via Cloud Functions */}
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          No activity logged yet.
        </p>
      </div>
    </div>
  );
}
