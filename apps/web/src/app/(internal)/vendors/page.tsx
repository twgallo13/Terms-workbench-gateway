import { PageHeader } from "@/components/shell";

export default function VendorsPage() {
  return (
    <div>
      <PageHeader
        title="Vendors"
        description="Manage vendor companies and their brands."
        actions={
          <button
            disabled
            style={{ padding: "8px 16px", fontSize: "13px", borderRadius: "4px" }}
          >
            {/* TODO: open create vendor flow */}
            + New Vendor
          </button>
        }
      />
      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px" }}>
        {/* TODO: vendor list table with filters, search, pagination */}
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          No vendors yet. Create your first vendor to get started.
        </p>
      </div>
    </div>
  );
}
