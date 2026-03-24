import { PageHeader, Card, StatusPill } from "@/components/shell";
import { Button } from "@/components/ui";
import { FileSignature, Plus } from "lucide-react";

const PLACEHOLDER_AGREEMENTS = [
  { number: "A-0001", vendor: "Acme Corp", brand: "Peak Athletics", status: "Draft", variant: "gray" as const },
  { number: "A-0002", vendor: "Beta Supply Co", brand: "Urban Edge", status: "Sent", variant: "blue" as const },
  { number: "A-0003", vendor: "Gamma Brands", brand: "Terra Outfitters", status: "Signed", variant: "green" as const },
];

export default function AgreementsPage() {
  return (
    <div>
      <PageHeader
        title="Agreements"
        description="Create, send, and track vendor agreements."
        actions={
          <Button disabled>
            <Plus className="h-4 w-4" />
            New Agreement
          </Button>
        }
      />

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 font-medium text-gray-600">Agreement #</th>
                <th className="px-5 py-3 font-medium text-gray-600">Vendor</th>
                <th className="px-5 py-3 font-medium text-gray-600">Brand</th>
                <th className="px-5 py-3 font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 font-medium text-gray-600">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PLACEHOLDER_AGREEMENTS.map((a) => (
                <tr key={a.number} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <FileSignature className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{a.number}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-700">{a.vendor}</td>
                  <td className="px-5 py-3.5 text-gray-700">{a.brand}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill label={a.status} variant={a.variant} />
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* TODO: fetch agreements from Firestore, implement pagination and filters */}
        <div className="border-t border-gray-200 px-5 py-3 text-xs text-gray-400">
          Showing placeholder data
        </div>
      </Card>
    </div>
  );
}
