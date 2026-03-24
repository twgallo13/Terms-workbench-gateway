"use client";

import { PageHeader, TabShell } from "@/components/shell";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Admin configuration — sites, fees, templates, users, and system defaults."
      />
      <TabShell
        tabs={[
          {
            key: "sites",
            label: "Sites",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: manage sites — add, deactivate, rename */}
                Sites management placeholder.
              </div>
            ),
          },
          {
            key: "fees",
            label: "Fees & Services",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: manage fees and services */}
                Fees & services placeholder.
              </div>
            ),
          },
          {
            key: "templates",
            label: "Templates",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: manage quote/agreement/notification templates */}
                Templates placeholder.
              </div>
            ),
          },
          {
            key: "terms",
            label: "Terms & Clauses",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: manage terms versions and clause library */}
                Terms & clauses placeholder.
              </div>
            ),
          },
          {
            key: "users",
            label: "Users & Access",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: manage users, roles, domain/email allowlists */}
                Users & access placeholder.
              </div>
            ),
          },
          {
            key: "fields",
            label: "Required Fields",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: manage required field rules and custom field definitions */}
                Required fields placeholder.
              </div>
            ),
          },
          {
            key: "checklists",
            label: "WB Checklists",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: manage WB handoff checklist templates */}
                WB checklist templates placeholder.
              </div>
            ),
          },
          {
            key: "system",
            label: "System",
            content: (
              <div style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
                {/* TODO: system settings, feature flags, numbering rules, integrations */}
                System settings placeholder.
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
