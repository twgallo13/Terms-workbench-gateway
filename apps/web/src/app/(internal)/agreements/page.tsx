import { PageHeader } from "@/components/shell";

export default function AgreementsPage() {
  return (
    <div>
      <PageHeader
        title="Agreements"
        description="All vendor agreements. One agreement per vendor + brand."
        actions={
          <button
            disabled
            style={{ padding: "8px 16px", fontSize: "13px", borderRadius: "4px" }}
          >
            {/* TODO: open agreement builder */}
            + New Agreement
          </button>
        }
      />
      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px" }}>
        {/* TODO: agreement list table with status, vendor, brand, signed date */}
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          No agreements yet.
        </p>
      </div>
    </div>
  );
}
