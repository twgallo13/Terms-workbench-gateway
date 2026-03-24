import { FeatureFlagStatus, IntegrationType, NumberingEntityType } from "../enums";

/** Firestore: systemSettings/{settingKey} */
export interface SystemSetting {
  id: string;
  key: string;
  value: unknown;
  description: string;
  isEditable: boolean;
  updatedAt: string;
  updatedBy: string;
}

/** Firestore: requiredFieldRules/{ruleId} */
export interface RequiredFieldRule {
  id: string;
  collection: string;
  fieldPath: string;
  isRequired: boolean;
  validationMessage?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: customFieldDefinitions/{fieldId} */
export interface CustomFieldDefinition {
  id: string;
  collection: string;
  fieldKey: string;
  label: string;
  fieldType: "text" | "number" | "boolean" | "date" | "select";
  options?: string[];
  isRequired: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: dashboardConfigs/{configId} */
export interface DashboardConfig {
  id: string;
  userId: string;
  layout: DashboardWidget[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardWidget {
  key: string;
  label: string;
  widgetType: string;
  position: number;
  isVisible: boolean;
}

/** Firestore: savedViews/{viewId} */
export interface SavedView {
  id: string;
  userId: string;
  module: string;
  name: string;
  filters: Record<string, unknown>;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Firestore: featureFlags/{flagId} */
export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  status: FeatureFlagStatus;
  updatedAt: string;
  updatedBy: string;
}

/** Firestore: numberingRules/{ruleId} */
export interface NumberingRule {
  id: string;
  entityType: NumberingEntityType;
  prefix: string;
  currentSequence: number;
  paddingLength: number;
  isActive: boolean;
  updatedAt: string;
  updatedBy: string;
}

/** Firestore: integrationConfigs/{configId} */
export interface IntegrationConfig {
  id: string;
  name: string;
  integrationType: IntegrationType;
  endpointUrl?: string;
  isActive: boolean;
  configData: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
