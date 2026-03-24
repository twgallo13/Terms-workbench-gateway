import { PageHeader, Card } from "@/components/shell";
import { EmptyState } from "@/components/ui";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Notifications"
        description="View system notifications and alerts."
      />
      <Card>
        <EmptyState
          icon={<Bell className="h-8 w-8" />}
          title="No notifications"
          description="Notifications will appear here for expiring links, overdue quotes, and system alerts."
        />
        {/* TODO: fetch notifications for current user from Firestore */}
      </Card>
    </div>
  );
}
