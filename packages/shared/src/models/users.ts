import { UserCategory } from "../enums";

/** Firestore: users/{userId} */
export interface User {
  id: string;
  firebaseUid: string;
  email: string;
  displayName: string;
  category: UserCategory;
  roleIds: string[];
  isActive: boolean;
  avatarUrl?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: roles/{roleId} */
export interface Role {
  id: string;
  name: string;
  description: string;
  permissionIds: string[];
  isSystem: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: permissions/{permissionId} */
export interface Permission {
  id: string;
  code: string;
  name: string;
  description: string;
  module: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Firestore: domainAllowlist/{entryId} */
export interface DomainAllowlistEntry {
  id: string;
  domain: string;
  autoRole: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

/** Firestore: emailAllowlist/{entryId} */
export interface EmailAllowlistEntry {
  id: string;
  email: string;
  autoRole: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

/** Firestore: accessAssignments/{assignmentId} */
export interface AccessAssignment {
  id: string;
  userId: string;
  vendorId?: string;
  brandId?: string;
  scope: "global" | "vendor" | "brand";
  roleId: string;
  isActive: boolean;
  grantedAt: string;
  grantedBy: string;
  revokedAt?: string;
  revokedBy?: string;
}
