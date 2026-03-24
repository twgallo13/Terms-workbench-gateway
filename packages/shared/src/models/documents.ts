import { DocumentStatus, DocumentCategory } from "../enums";

/** Firestore: documents/{documentId} */
export interface Document {
  id: string;
  vendorId?: string;
  brandId?: string;
  quoteId?: string;
  agreementId?: string;
  fileName: string;
  storagePath: string;
  mimeType: string;
  fileSizeBytes: number;
  category: DocumentCategory;
  status: DocumentStatus;
  isLocked: boolean;
  description?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
