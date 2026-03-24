import { PageHeader, Card } from "@/components/shell";
import { EmptyState } from "@/components/ui";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reports"
        description="Analytics and reporting dashboards for the onboarding pipeline."
      />
      <Card>
        <EmptyState
          icon={<BarChart3 className="h-8 w-8" />}
          title="Reports coming soon"
          description="Pipeline analytics, vendor onboarding metrics, and export tools will be available here."
        />
        {/* TODO: implement reporting dashboards — pipeline funnel, turnaround time, vendor status breakdown */}
      </Card>
    </div>
  );
}
