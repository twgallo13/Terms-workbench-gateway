import { PageHeader } from "@/components/shell";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of vendor onboarding pipeline and key metrics."
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* TODO: dashboard widgets — pipeline counts, recent activity, pending actions */}
        {["Vendors", "Active Quotes", "Pending Agreements", "WB Handoffs"].map((label) => (
          <div
            key={label}
            style={{
              background: "#fff",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{label}</p>
            <p style={{ fontSize: "28px", fontWeight: 700, marginTop: "4px" }}>—</p>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px" }}>
        <p style={{ fontWeight: 600, marginBottom: "8px" }}>Recent Activity</p>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          {/* TODO: activity feed from activityLogs collection */}
          No recent activity to display.
        </p>
      </div>
    </div>
  );
}
