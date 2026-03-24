import { PageHeader } from "@/components/shell";

export default function WbHandoffsPage() {
  return (
    <div>
      <PageHeader
        title="WB Handoffs"
        description="Track vendor-brand readiness for Workbench upload."
      />
      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px" }}>
        {/* TODO: handoff list with status, checklist progress, owner */}
        {/* TODO: WB handoff workflow — will be implemented in later phase */}
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          No WB handoffs yet.
        </p>
      </div>
    </div>
  );
}
