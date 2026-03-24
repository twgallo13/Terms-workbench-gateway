import { PageHeader } from "@/components/shell";

export default function BrandsPage() {
  return (
    <div>
      <PageHeader
        title="Brands"
        description="Manage brands across all vendors."
        actions={
          <button
            disabled
            style={{ padding: "8px 16px", fontSize: "13px", borderRadius: "4px" }}
          >
            {/* TODO: open create brand flow */}
            + New Brand
          </button>
        }
      />
      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px" }}>
        {/* TODO: brand list table with vendor, status, site approvals */}
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          No brands yet.
        </p>
      </div>
    </div>
  );
}
