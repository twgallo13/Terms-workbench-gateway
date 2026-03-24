// ─── Status Enums ───────────────────────────────────────────────────────────

/** Vendor-level status */
export enum VendorStatus {
  Active = "active",
  Inactive = "inactive",
  Suspended = "suspended",
  Archived = "archived",
}

/** Brand-level status */
export enum BrandStatus {
  Active = "active",
  Inactive = "inactive",
  PendingApproval = "pending_approval",
  Archived = "archived",
}

/** Contact status */
export enum ContactStatus {
  Active = "active",
  Inactive = "inactive",
}

/** Site status */
export enum SiteStatus {
  Active = "active",
  Inactive = "inactive",
}

/** Site approval status per brand */
export enum SiteApprovalStatus {
  Approved = "approved",
  Pending = "pending",
  Revoked = "revoked",
}

/** Quote-level status */
export enum QuoteStatus {
  Draft = "draft",
  PendingReview = "pending_review",
  Sent = "sent",
  Viewed = "viewed",
  Accepted = "accepted",
  Rejected = "rejected",
  Expired = "expired",
  Superseded = "superseded",
  Cancelled = "cancelled",
}

/** Agreement-level status */
export enum AgreementStatus {
  Draft = "draft",
  PendingReview = "pending_review",
  Sent = "sent",
  Viewed = "viewed",
  Accepted = "accepted",
  Rejected = "rejected",
  Expired = "expired",
  Superseded = "superseded",
  Cancelled = "cancelled",
}

/** WB handoff status */
export enum WbHandoffStatus {
  NotReady = "not_ready",
  ReadyForHandoff = "ready_for_handoff",
  InProgress = "in_progress",
  Completed = "completed",
  OnHold = "on_hold",
}

/** Access link status */
export enum AccessLinkStatus {
  Active = "active",
  Used = "used",
  Expired = "expired",
  Revoked = "revoked",
}

/** Task status */
export enum TaskStatus {
  Open = "open",
  InProgress = "in_progress",
  Completed = "completed",
  Cancelled = "cancelled",
}

/** Notification status */
export enum NotificationStatus {
  Unread = "unread",
  Read = "read",
  Dismissed = "dismissed",
}

/** Change request status */
export enum ChangeRequestStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  Withdrawn = "withdrawn",
}

/** Document status */
export enum DocumentStatus {
  Active = "active",
  Archived = "archived",
  Deleted = "deleted",
}

/** Feature flag status */
export enum FeatureFlagStatus {
  Enabled = "enabled",
  Disabled = "disabled",
}

/** Terms version status */
export enum TermsVersionStatus {
  Draft = "draft",
  Active = "active",
  Archived = "archived",
}

/** Template status */
export enum TemplateStatus {
  Draft = "draft",
  Active = "active",
  Archived = "archived",
}

// ─── Type Enums ─────────────────────────────────────────────────────────────

/** User category */
export enum UserCategory {
  Internal = "internal",
  External = "external",
  System = "system",
}

/** Contact type */
export enum ContactType {
  Primary = "primary",
  Legal = "legal",
  Operations = "operations",
  Support = "support",
  Billing = "billing",
  Other = "other",
}

/** Fee type */
export enum FeeType {
  Fixed = "fixed",
  Percentage = "percentage",
  Tiered = "tiered",
}

/** Service type */
export enum ServiceType {
  Standard = "standard",
  Premium = "premium",
  Custom = "custom",
}

/** Pricing model type */
export enum PricingModelType {
  Standard = "standard",
  Custom = "custom",
}

/** Access link type */
export enum AccessLinkType {
  Review = "review",
  Sign = "sign",
  ViewOnly = "view_only",
}

/** Task type */
export enum TaskType {
  ReviewQuote = "review_quote",
  ReviewAgreement = "review_agreement",
  ApproveVendor = "approve_vendor",
  CompleteHandoff = "complete_handoff",
  FollowUp = "follow_up",
  Custom = "custom",
}

/** Activity event type */
export enum ActivityEventType {
  Created = "created",
  Updated = "updated",
  StatusChanged = "status_changed",
  Viewed = "viewed",
  Sent = "sent",
  Accepted = "accepted",
  Rejected = "rejected",
  Signed = "signed",
  LinkGenerated = "link_generated",
  LinkRevoked = "link_revoked",
  Login = "login",
  LoginFailed = "login_failed",
  RoleChanged = "role_changed",
  PermissionChanged = "permission_changed",
  DocumentUploaded = "document_uploaded",
  HandoffCompleted = "handoff_completed",
  CommentAdded = "comment_added",
}

/** Notification type */
export enum NotificationType {
  QuoteSent = "quote_sent",
  QuoteAccepted = "quote_accepted",
  QuoteRejected = "quote_rejected",
  AgreementSent = "agreement_sent",
  AgreementAccepted = "agreement_accepted",
  AgreementRejected = "agreement_rejected",
  ChangeRequested = "change_requested",
  HandoffReady = "handoff_ready",
  TaskAssigned = "task_assigned",
  System = "system",
}

/** Document category */
export enum DocumentCategory {
  Quote = "quote",
  Agreement = "agreement",
  SignedAgreement = "signed_agreement",
  SupportingDocument = "supporting_document",
  InternalNote = "internal_note",
}

/** Clause type */
export enum ClauseType {
  Standard = "standard",
  Optional = "optional",
  Custom = "custom",
}

/** Integration type */
export enum IntegrationType {
  Webhook = "webhook",
  Api = "api",
  Manual = "manual",
}

/** Numbering entity type */
export enum NumberingEntityType {
  Quote = "quote",
  Agreement = "agreement",
  Vendor = "vendor",
  Brand = "brand",
}
