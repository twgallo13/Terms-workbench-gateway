import {
  TaskStatus,
  TaskType,
  NotificationStatus,
  NotificationType,
  ActivityEventType,
} from "../enums";

/** Firestore: tasks/{taskId} */
export interface Task {
  id: string;
  taskType: TaskType;
  title: string;
  description?: string;
  status: TaskStatus;
  assigneeId?: string;
  vendorId?: string;
  brandId?: string;
  quoteId?: string;
  agreementId?: string;
  dueDate?: string;
  completedAt?: string;
  completedBy?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/** Firestore: notifications/{notificationId} */
export interface Notification {
  id: string;
  recipientId: string;
  notificationType: NotificationType;
  title: string;
  message: string;
  status: NotificationStatus;
  linkUrl?: string;
  vendorId?: string;
  brandId?: string;
  readAt?: string;
  dismissedAt?: string;
  createdAt: string;
}

/** Firestore: activityLogs/{logId} */
export interface ActivityLog {
  id: string;
  eventType: ActivityEventType;
  actorId: string;
  actorCategory: "internal" | "external" | "system";
  targetCollection: string;
  targetId: string;
  vendorId?: string;
  brandId?: string;
  description: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}
