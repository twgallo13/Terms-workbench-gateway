import { PageHeader, Card, StatusPill } from "@/components/shell";
import { Button } from "@/components/ui";
import { FileText, Plus } from "lucide-react";

const PLACEHOLDER_QUOTES = [
  { number: "Q-0001", vendor: "Acme Corp", brand: "Peak Athletics", status: "Draft", variant: "gray" as const },
  { number: "Q-0002", vendor: "Beta Supply Co", brand: "Urban Edge", status: "Sent", variant: "blue" as const },
  { number: "Q-0003", vendor: "Gamma Brands", brand: "Terra Outfitters", status: "Accepted", variant: "green" as const },
];

export default function QuotesPage() {
  return (
    <div>
      <PageHeader
        title="Quotes"
        description="Create, manage, and track vendor pricing quotes."
        actions={
          <Button disabled>
            <Plus className="h-4 w-4" />
            New Quote
          </Button>
        }
      />

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 font-medium text-gray-600">Quote #</th>
                <th className="px-5 py-3 font-medium text-gray-600">Vendor</th>
                <th className="px-5 py-3 font-medium text-gray-600">Brand</th>
                <th className="px-5 py-3 font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 font-medium text-gray-600">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PLACEHOLDER_QUOTES.map((q) => (
                <tr key={q.number} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{q.number}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-700">{q.vendor}</td>
                  <td className="px-5 py-3.5 text-gray-700">{q.brand}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill label={q.status} variant={q.variant} />
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* TODO: fetch quotes from Firestore, implement pagination and filters */}
        <div className="border-t border-gray-200 px-5 py-3 text-xs text-gray-400">
          Showing placeholder data
        </div>
      </Card>
    </div>
  );
}
