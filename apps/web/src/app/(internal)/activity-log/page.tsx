import { PageHeader, Card } from "@/components/shell";
import { EmptyState } from "@/components/ui";
import { ClipboardList } from "lucide-react";

export default function ActivityLogPage() {
  return (
    <div>
      <PageHeader
        title="Activity Log"
        description="Audit trail of all actions across the platform."
      />
      <Card>
        <EmptyState
          icon={<ClipboardList className="h-8 w-8" />}
          title="No activity recorded"
          description="Activity events will be logged here automatically as users interact with the system."
        />
        {/* TODO: fetch activity logs from Firestore, implement filters by actor/event type/date */}
      </Card>
    </div>
  );
}
