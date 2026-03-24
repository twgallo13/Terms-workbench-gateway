import { PageHeader, Card, StatusPill } from "@/components/shell";
import { EmptyState } from "@/components/ui";
import { ArrowRightLeft } from "lucide-react";

const PLACEHOLDER_HANDOFFS = [
  { vendor: "Acme Corp", brand: "Peak Athletics", status: "Ready for WB", variant: "blue" as const },
  { vendor: "Beta Supply Co", brand: "Urban Edge", status: "In Progress", variant: "yellow" as const },
];

export default function WbHandoffsPage() {
  return (
    <div>
      <PageHeader
        title="WB Handoffs"
        description="Track vendor onboarding handoffs to the Warehouse & Buying team."
      />
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 font-medium text-gray-600">Vendor</th>
                <th className="px-5 py-3 font-medium text-gray-600">Brand</th>
                <th className="px-5 py-3 font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 font-medium text-gray-600">Checklist Progress</th>
                <th className="px-5 py-3 font-medium text-gray-600">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PLACEHOLDER_HANDOFFS.map((h) => (
                <tr key={h.vendor + h.brand} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5 font-medium text-gray-900">{h.vendor}</td>
                  <td className="px-5 py-3.5 text-gray-700">{h.brand}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill label={h.status} variant={h.variant} />
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">— / —</td>
                  <td className="px-5 py-3.5 text-gray-500">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* TODO: fetch WB handoffs from Firestore, implement checklist tracking */}
        <div className="border-t border-gray-200 px-5 py-3 text-xs text-gray-400">
          Showing placeholder data
        </div>
      </Card>
    </div>
  );
}
