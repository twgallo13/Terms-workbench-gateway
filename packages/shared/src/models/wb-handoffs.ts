import { WbHandoffStatus } from "../enums";

/** Firestore: wbHandoffs/{handoffId} */
export interface WbHandoff {
  id: string;
  vendorId: string;
  brandId: string;
  agreementId: string;
  status: WbHandoffStatus;
  internalOwnerId?: string;
  checklistTemplateId?: string;
  checklistItems: WbHandoffChecklistItem[];
  notes?: string;
  completedAt?: string;
  completedBy?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Checklist item within a WB handoff */
export interface WbHandoffChecklistItem {
  key: string;
  label: string;
  isCompleted: boolean;
  completedAt?: string;
  completedBy?: string;
  notes?: string;
}
