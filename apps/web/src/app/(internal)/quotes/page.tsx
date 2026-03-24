import { PageHeader } from "@/components/shell";

export default function QuotesPage() {
  return (
    <div>
      <PageHeader
        title="Quotes"
        description="All vendor quotes. One quote per vendor + brand."
        actions={
          <button
            disabled
            style={{ padding: "8px 16px", fontSize: "13px", borderRadius: "4px" }}
          >
            {/* TODO: open quote builder */}
            + New Quote
          </button>
        }
      />
      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px" }}>
        {/* TODO: quote list table with status pills, vendor, brand, sent date */}
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          No quotes yet.
        </p>
      </div>
    </div>
  );
}
