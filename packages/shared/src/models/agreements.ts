import { AgreementStatus, AccessLinkStatus, AccessLinkType, ChangeRequestStatus } from "../enums";

/** Firestore: agreements/{agreementId} */
export interface Agreement {
  id: string;
  vendorId: string;
  brandId: string;
  agreementNumber: string;
  status: AgreementStatus;
  currentVersionId?: string;
  quoteId?: string;
  termsVersionId?: string;
  packageLayoutId?: string;
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

/** Firestore: agreementVersions/{versionId} */
export interface AgreementVersion {
  id: string;
  agreementId: string;
  versionNumber: number;
  snapshot: AgreementSnapshot;
  changeNotes?: string;
  createdAt: string;
  createdBy: string;
}

/** Immutable snapshot of agreement data at a point in time */
export interface AgreementSnapshot {
  vendorId: string;
  brandId: string;
  agreementNumber: string;
  status: AgreementStatus;
  quoteId?: string;
  termsVersionId?: string;
  packageLayoutId?: string;
  siteApprovalIds: string[];
  capturedAt: string;
}

/** Firestore: signerAssignments/{assignmentId} */
export interface SignerAssignment {
  id: string;
  agreementId: string;
  contactId: string;
  signerRole: string;
  isSigned: boolean;
  signedAt?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  createdBy: string;
}

/** Firestore: accessLinks/{linkId} */
export interface AccessLink {
  id: string;
  token: string;
  vendorId: string;
  brandId?: string;
  agreementId?: string;
  quoteId?: string;
  contactId?: string;
  linkType: AccessLinkType;
  status: AccessLinkStatus;
  expiresAt: string;
  usedAt?: string;
  revokedAt?: string;
  revokedBy?: string;
  createdAt: string;
  createdBy: string;
}

/** Firestore: acceptanceEvents/{eventId} */
export interface AcceptanceEvent {
  id: string;
  agreementId: string;
  agreementVersionId: string;
  signerAssignmentId: string;
  contactId: string;
  acceptedAt: string;
  ipAddress: string;
  userAgent: string;
  termsVersionId: string;
  snapshotStoragePath: string;
}

/** Firestore: changeRequests/{requestId} */
export interface ChangeRequest {
  id: string;
  agreementId?: string;
  quoteId?: string;
  vendorId: string;
  brandId: string;
  contactId: string;
  status: ChangeRequestStatus;
  requestDetails: string;
  responseNotes?: string;
  respondedBy?: string;
  respondedAt?: string;
  createdAt: string;
}
