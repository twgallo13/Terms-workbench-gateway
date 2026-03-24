import { TemplateStatus, TermsVersionStatus, ClauseType } from "../enums";

/** Firestore: quoteTemplates/{templateId} */
export interface QuoteTemplate {
  id: string;
  name: string;
  description: string;
  status: TemplateStatus;
  sections: TemplateSection[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: agreementTemplates/{templateId} */
export interface AgreementTemplate {
  id: string;
  name: string;
  description: string;
  status: TemplateStatus;
  sections: TemplateSection[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: packageLayouts/{layoutId} */
export interface PackageLayout {
  id: string;
  name: string;
  description: string;
  status: TemplateStatus;
  sectionOrder: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: clauseLibrary/{clauseId} */
export interface Clause {
  id: string;
  name: string;
  clauseType: ClauseType;
  content: string;
  version: number;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: termsVersions/{versionId} */
export interface TermsVersion {
  id: string;
  name: string;
  description: string;
  status: TermsVersionStatus;
  versionNumber: string;
  effectiveDate: string;
  content: string;
  clauseIds: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: wbChecklistTemplates/{templateId} */
export interface WbChecklistTemplate {
  id: string;
  name: string;
  description: string;
  status: TemplateStatus;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: notificationTemplates/{templateId} */
export interface NotificationTemplate {
  id: string;
  name: string;
  eventType: string;
  subject: string;
  bodyTemplate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Shared template section structure */
export interface TemplateSection {
  key: string;
  label: string;
  sortOrder: number;
  isRequired: boolean;
}

/** Shared checklist item structure */
export interface ChecklistItem {
  key: string;
  label: string;
  description?: string;
  sortOrder: number;
  isRequired: boolean;
}
