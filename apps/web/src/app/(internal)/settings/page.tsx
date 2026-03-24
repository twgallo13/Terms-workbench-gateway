"use client";

import { PageHeader, TabShell, Card, CardHeader } from "@/components/shell";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Platform configuration — sites, fees, templates, users, and system defaults."
      />
      <TabShell
        tabs={[
          {
            key: "sites",
            label: "Sites",
            content: (
              <Card>
                <CardHeader
                  title="Managed Sites"
                  description="Sites available for vendor approval (e.g., Shiekh.com, Karmaloop.com, MLTD.com)."
                />
                <p className="text-sm text-gray-500">No sites configured.</p>
                {/* TODO: CRUD for sites collection — seed with Shiekh.com, Karmaloop.com, MLTD.com */}
              </Card>
            ),
          },
          {
            key: "fees",
            label: "Fees and Services",
            content: (
              <Card>
                <CardHeader
                  title="Fee Schedule"
                  description="Standard fees and services applied to vendor pricing profiles."
                />
                <p className="text-sm text-gray-500">No fees configured.</p>
                {/* TODO: CRUD for fees and services collections */}
              </Card>
            ),
          },
          {
            key: "templates",
            label: "Templates",
            content: (
              <Card>
                <CardHeader
                  title="Quote and Agreement Templates"
                  description="Manage templates used for generating quotes and agreements."
                />
                <p className="text-sm text-gray-500">No templates configured.</p>
                {/* TODO: CRUD for quoteTemplates, agreementTemplates, packageLayouts */}
              </Card>
            ),
          },
          {
            key: "terms",
            label: "Terms and Clauses",
            content: (
              <Card>
                <CardHeader
                  title="Terms Library"
                  description="Manage terms versions and the clause library."
                />
                <p className="text-sm text-gray-500">No terms versions configured.</p>
                {/* TODO: CRUD for termsVersions and clauseLibrary */}
              </Card>
            ),
          },
          {
            key: "users",
            label: "Users and Roles",
            content: (
              <Card>
                <CardHeader
                  title="User Management"
                  description="Manage internal users, roles, and permissions."
                />
                <p className="text-sm text-gray-500">No users to display.</p>
                {/* TODO: list users, roles, permissions — CRUD */}
              </Card>
            ),
          },
          {
            key: "allowlists",
            label: "Access Control",
            content: (
              <Card>
                <CardHeader
                  title="Domain and Email Allowlists"
                  description="Control which domains and emails can auto-provision internal accounts."
                />
                <p className="text-sm text-gray-500">No allowlist entries configured.</p>
                {/* TODO: CRUD for domainAllowlist and emailAllowlist */}
              </Card>
            ),
          },
          {
            key: "numbering",
            label: "Numbering",
            content: (
              <Card>
                <CardHeader
                  title="Auto-Numbering"
                  description="Configure numbering sequences for quotes, agreements, and other entities."
                />
                <p className="text-sm text-gray-500">No numbering rules configured.</p>
                {/* TODO: CRUD for numberingCounters */}
              </Card>
            ),
          },
          {
            key: "system",
            label: "System",
            content: (
              <Card>
                <CardHeader
                  title="System Settings"
                  description="Global platform settings, feature flags, and integrations."
                />
                <p className="text-sm text-gray-500">No system settings configured.</p>
                {/* TODO: CRUD for systemSettings, featureFlags, integrationConfigs */}
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}
