import { PageHeader } from "@/components/shell";

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reports"
        description="Vendor pipeline, agreement status, and operational reports."
      />
      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px" }}>
        {/* TODO: report types — pipeline summary, agreement status, handoff progress */}
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          Reports will be available in a future phase.
        </p>
      </div>
    </div>
  );
}
