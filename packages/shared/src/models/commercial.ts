import { FeeType, ServiceType, PricingModelType } from "../enums";

/** Firestore: services/{serviceId} */
export interface Service {
  id: string;
  name: string;
  description: string;
  serviceType: ServiceType;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: fees/{feeId} */
export interface Fee {
  id: string;
  name: string;
  description: string;
  feeType: FeeType;
  amount?: number;
  percentage?: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: pricingProfiles/{profileId} */
export interface PricingProfile {
  id: string;
  name: string;
  description: string;
  pricingModelType: PricingModelType;
  feeIds: string[];
  serviceIds: string[];
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: operationalProfiles/{profileId} */
export interface OperationalProfile {
  id: string;
  name: string;
  description: string;
  shippingSla?: string;
  carrierExpectations?: string;
  blindShippingRequired?: boolean;
  returnTimingExpectations?: string;
  cancellationLanguage?: string;
  trackingExpectations?: string;
  supportResponseExpectations?: string;
  customFields?: Record<string, unknown>;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
