import { PageHeader } from "@/components/shell";

export default function NotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Notifications Center"
        description="Your notifications — quote updates, agreement events, task assignments."
      />
      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px" }}>
        {/* TODO: notification list with read/unread, type, link to target */}
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          No notifications.
        </p>
      </div>
    </div>
  );
}
