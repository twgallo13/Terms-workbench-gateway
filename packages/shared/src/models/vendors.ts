import { VendorStatus, BrandStatus, ContactStatus, ContactType } from "../enums";

/** Firestore: vendors/{vendorId} */
export interface Vendor {
  id: string;
  legalCompanyName: string;
  dba?: string;
  taxId?: string;
  website?: string;
  businessAddress?: Address;
  returnAddress?: Address;
  status: VendorStatus;
  internalNotes?: string;
  internalOwnerId?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: brands/{brandId} */
export interface Brand {
  id: string;
  vendorId: string;
  brandName: string;
  status: BrandStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: contacts/{contactId} */
export interface Contact {
  id: string;
  vendorId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title?: string;
  contactType: ContactType;
  status: ContactStatus;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: brandContactAssignments/{assignmentId} */
export interface BrandContactAssignment {
  id: string;
  brandId: string;
  contactId: string;
  contactType: ContactType;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

/** Shared address structure */
export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
