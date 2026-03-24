import { PageHeader } from "@/components/shell";

export default function TasksPage() {
  return (
    <div>
      <PageHeader
        title="Tasks / Queue"
        description="Pending actions, review tasks, and follow-ups."
      />
      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px" }}>
        {/* TODO: task queue with filters by type, assignee, status */}
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          No open tasks.
        </p>
      </div>
    </div>
  );
}
