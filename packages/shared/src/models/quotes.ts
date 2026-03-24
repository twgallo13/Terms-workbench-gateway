import { QuoteStatus } from "../enums";

/** Firestore: quotes/{quoteId} */
export interface Quote {
  id: string;
  vendorId: string;
  brandId: string;
  quoteNumber: string;
  status: QuoteStatus;
  currentVersionId?: string;
  pricingProfileId?: string;
  operationalProfileId?: string;
  termsVersionId?: string;
  siteApprovalIds: string[];
  internalNotes?: string;
  internalOwnerId?: string;
  sentAt?: string;
  sentTo?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: quoteVersions/{versionId} */
export interface QuoteVersion {
  id: string;
  quoteId: string;
  versionNumber: number;
  snapshot: QuoteSnapshot;
  changeNotes?: string;
  createdAt: string;
  createdBy: string;
}

/** Immutable snapshot of quote data at a point in time */
export interface QuoteSnapshot {
  vendorId: string;
  brandId: string;
  quoteNumber: string;
  status: QuoteStatus;
  pricingProfileId?: string;
  operationalProfileId?: string;
  termsVersionId?: string;
  siteApprovalIds: string[];
  capturedAt: string;
}
