/**
 * Seed constants — admin-configurable at runtime; these are initial defaults only.
 * Do NOT hardcode business logic against these values.
 */

// ─── Sites (initial seed) ───────────────────────────────────────────────────
export const SEED_SITES = [
  { name: "Shiekh.com", domain: "shiekh.com", displayLabel: "Shiekh.com" },
  { name: "Karmaloop.com", domain: "karmaloop.com", displayLabel: "Karmaloop.com" },
  { name: "MLTD.com", domain: "mltd.com", displayLabel: "MLTD.com" },
] as const;

// ─── Internal admin seed accounts ───────────────────────────────────────────
export const SEED_ADMIN_EMAILS = [
  "theo@shiekhshoes.org",
  "theo@shiekh.com",
] as const;

// ─── Internal domain auto-provision ─────────────────────────────────────────
export const SEED_INTERNAL_DOMAINS = [
  "shiekhshoes.org",
] as const;

// ─── Firestore collection names ─────────────────────────────────────────────
export const COLLECTIONS = {
  users: "users",
  roles: "roles",
  permissions: "permissions",
  domainAllowlist: "domainAllowlist",
  emailAllowlist: "emailAllowlist",
  accessAssignments: "accessAssignments",
  vendors: "vendors",
  brands: "brands",
  contacts: "contacts",
  brandContactAssignments: "brandContactAssignments",
  sites: "sites",
  siteApprovals: "siteApprovals",
  services: "services",
  fees: "fees",
  pricingProfiles: "pricingProfiles",
  operationalProfiles: "operationalProfiles",
  quoteTemplates: "quoteTemplates",
  agreementTemplates: "agreementTemplates",
  packageLayouts: "packageLayouts",
  clauseLibrary: "clauseLibrary",
  termsVersions: "termsVersions",
  wbChecklistTemplates: "wbChecklistTemplates",
  notificationTemplates: "notificationTemplates",
  quotes: "quotes",
  quoteVersions: "quoteVersions",
  agreements: "agreements",
  agreementVersions: "agreementVersions",
  signerAssignments: "signerAssignments",
  accessLinks: "accessLinks",
  acceptanceEvents: "acceptanceEvents",
  changeRequests: "changeRequests",
  documents: "documents",
  wbHandoffs: "wbHandoffs",
  tasks: "tasks",
  notifications: "notifications",
  activityLogs: "activityLogs",
  systemSettings: "systemSettings",
  requiredFieldRules: "requiredFieldRules",
  customFieldDefinitions: "customFieldDefinitions",
  dashboardConfigs: "dashboardConfigs",
  savedViews: "savedViews",
  featureFlags: "featureFlags",
  numberingRules: "numberingRules",
  integrationConfigs: "integrationConfigs",
} as const;
