import { PageHeader, Card } from "@/components/shell";
import { EmptyState } from "@/components/ui";
import { CheckSquare } from "lucide-react";

export default function TasksPage() {
  return (
    <div>
      <PageHeader
        title="Tasks"
        description="View and manage assigned tasks across the onboarding pipeline."
      />
      <Card>
        <EmptyState
          icon={<CheckSquare className="h-8 w-8" />}
          title="No tasks assigned"
          description="Tasks will appear here as vendors move through the onboarding workflow."
        />
        {/* TODO: fetch tasks from Firestore, filter by assignee/status */}
      </Card>
    </div>
  );
}
