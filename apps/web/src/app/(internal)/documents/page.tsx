import { PageHeader } from "@/components/shell";

export default function DocumentsPage() {
  return (
    <div>
      <PageHeader
        title="Documents Repository"
        description="Central repository for all vendor documents, signed agreements, and uploads."
      />
      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px" }}>
        {/* TODO: document list with category filters, search, vendor/brand scoping */}
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          No documents yet.
        </p>
      </div>
    </div>
  );
}
