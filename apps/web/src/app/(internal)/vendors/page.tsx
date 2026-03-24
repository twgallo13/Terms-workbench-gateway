import { PageHeader, Card, StatusPill } from "@/components/shell";
import { Button, EmptyState } from "@/components/ui";
import { Building2, Plus } from "lucide-react";

const PLACEHOLDER_VENDORS = [
  { name: "Acme Corp", status: "Active", variant: "green" as const },
  { name: "Beta Supply Co", status: "Pending Approval", variant: "yellow" as const },
  { name: "Gamma Brands", status: "Draft", variant: "gray" as const },
];

export default function VendorsPage() {
  return (
    <div>
      <PageHeader
        title="Vendors"
        description="Manage vendor accounts, profiles, and onboarding status."
        actions={
          <Button disabled>
            <Plus className="h-4 w-4" />
            New Vendor
          </Button>
        }
      />

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 font-medium text-gray-600">Vendor Name</th>
                <th className="px-5 py-3 font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 font-medium text-gray-600">Owner</th>
                <th className="px-5 py-3 font-medium text-gray-600">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PLACEHOLDER_VENDORS.map((vendor) => (
                <tr key={vendor.name} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                        <Building2 className="h-4 w-4 text-gray-500" />
                      </div>
                      <span className="font-medium text-gray-900">{vendor.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusPill label={vendor.status} variant={vendor.variant} />
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">—</td>
                  <td className="px-5 py-3.5 text-gray-500">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* TODO: fetch vendors from Firestore, implement pagination */}
        <div className="border-t border-gray-200 px-5 py-3 text-xs text-gray-400">
          Showing placeholder data
        </div>
      </Card>
    </div>
  );
}
