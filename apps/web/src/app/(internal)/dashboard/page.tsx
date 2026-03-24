import { PageHeader, Card, CardHeader, StatusPill } from "@/components/shell";
import { Button } from "@/components/ui";
import {
  AlertTriangle,
  ClipboardList,
  Users,
  TrendingUp,
  Bell,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of vendor onboarding pipeline and key metrics."
      />

      {/* Action Required */}
      <section className="mb-6">
        <Card>
          <CardHeader
            title="Action Required"
            description="Items that need your immediate attention"
            actions={<Button variant="ghost" size="sm">View All</Button>}
          />
          <div className="space-y-3">
            {[
              {
                label: "Agreement awaiting signature — Acme Corp",
                status: "Pending Signature",
                variant: "yellow" as const,
                icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
              },
              {
                label: "Quote expired — Beta Supply Co",
                status: "Expired",
                variant: "red" as const,
                icon: <Clock className="h-4 w-4 text-red-500" />,
              },
              {
                label: "New vendor application — Gamma Brands",
                status: "Needs Review",
                variant: "blue" as const,
                icon: <ClipboardList className="h-4 w-4 text-blue-500" />,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm font-medium text-gray-900">
                    {item.label}
                  </span>
                </div>
                <StatusPill label={item.status} variant={item.variant} />
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Queue columns */}
      <section className="mb-6 grid gap-6 lg:grid-cols-2">
        {/* My Queue */}
        <Card>
          <CardHeader
            title="My Queue"
            description="Tasks assigned to you"
          />
          <div className="space-y-2">
            {[
              "Finalize quote for Delta Footwear",
              "Review brand profile — Epsilon Athletics",
              "Follow up on site approval — Karmaloop.com",
            ].map((task) => (
              <div
                key={task}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <div className="h-2 w-2 rounded-full bg-brand-600" />
                <span>{task}</span>
              </div>
            ))}
            {/* TODO: fetch tasks assigned to current user */}
            <p className="pt-1 text-xs text-gray-400">
              Showing placeholder tasks
            </p>
          </div>
        </Card>

        {/* Team Queue */}
        <Card>
          <CardHeader
            title="Team Queue"
            description="Unassigned and team-wide tasks"
          />
          <div className="space-y-2">
            {[
              "New vendor onboarding — Zeta Wholesale",
              "Checklist review — WB Handoff for Theta Group",
              "Document upload pending — Iota Brands",
            ].map((task) => (
              <div
                key={task}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Users className="h-3.5 w-3.5 text-gray-400" />
                <span>{task}</span>
              </div>
            ))}
            {/* TODO: fetch unassigned team tasks */}
            <p className="pt-1 text-xs text-gray-400">
              Showing placeholder tasks
            </p>
          </div>
        </Card>
      </section>

      {/* Snapshot Metrics */}
      <section className="mb-6">
        <Card>
          <CardHeader title="Snapshot Metrics" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Active Vendors", value: "—", icon: Users },
              { label: "Open Quotes", value: "—", icon: ClipboardList },
              { label: "Pending Agreements", value: "—", icon: AlertTriangle },
              { label: "WB Handoffs", value: "—", icon: TrendingUp },
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-md border border-gray-100 bg-gray-50 p-4"
              >
                <div className="flex items-center gap-2 text-gray-500">
                  <metric.icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{metric.label}</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {metric.value}
                </p>
                {/* TODO: fetch real metrics from Firestore aggregations */}
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Bottom row: Alerts + Recent Activity */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Alerts and Exceptions */}
        <Card>
          <CardHeader
            title="Alerts and Exceptions"
            actions={<Bell className="h-4 w-4 text-gray-400" />}
          />
          <div className="space-y-2">
            {[
              {
                msg: "2 access links expire within 24 hours",
                variant: "yellow" as const,
              },
              {
                msg: "Quote #Q-0042 has been pending for 14 days",
                variant: "red" as const,
              },
              {
                msg: "3 vendors have incomplete profiles",
                variant: "gray" as const,
              },
            ].map((alert) => (
              <div
                key={alert.msg}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm"
              >
                <StatusPill label="!" variant={alert.variant} />
                <span className="text-gray-700">{alert.msg}</span>
              </div>
            ))}
            {/* TODO: fetch alerts from system rules / scheduled checks */}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader
            title="Recent Activity"
            actions={<Button variant="ghost" size="sm">View Log</Button>}
          />
          <div className="space-y-2">
            {[
              {
                actor: "Theo G.",
                action: "created a new quote for Acme Corp",
                time: "2 hours ago",
              },
              {
                actor: "System",
                action: "sent agreement to Beta Supply Co",
                time: "5 hours ago",
              },
              {
                actor: "Jane D.",
                action: "approved site access for Karmaloop.com",
                time: "Yesterday",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-md px-3 py-2.5 text-sm"
              >
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-gray-300" />
                <div>
                  <span className="font-medium text-gray-900">
                    {event.actor}
                  </span>{" "}
                  <span className="text-gray-600">{event.action}</span>
                  <p className="text-xs text-gray-400">{event.time}</p>
                </div>
              </div>
            ))}
            {/* TODO: fetch from activityLogs collection */}
          </div>
        </Card>
      </section>
    </div>
  );
}
