import { SiteStatus, SiteApprovalStatus } from "../enums";

/** Firestore: sites/{siteId} */
export interface Site {
  id: string;
  name: string;
  displayLabel: string;
  domain: string;
  status: SiteStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: siteApprovals/{approvalId} */
export interface SiteApproval {
  id: string;
  brandId: string;
  siteId: string;
  status: SiteApprovalStatus;
  approvedAt?: string;
  approvedBy?: string;
  revokedAt?: string;
  revokedBy?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
