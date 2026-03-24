import { PageHeader } from "@/components/shell";

export default function ContactsPage() {
  return (
    <div>
      <PageHeader
        title="Contact Directory"
        description="All vendor contacts across companies and brands."
      />
      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px" }}>
        {/* TODO: contact list with vendor/brand association, type, status */}
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
          No contacts yet.
        </p>
      </div>
    </div>
  );
}
