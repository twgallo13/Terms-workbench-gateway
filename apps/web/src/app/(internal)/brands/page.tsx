import { PageHeader, Card, StatusPill } from "@/components/shell";
import { Button } from "@/components/ui";
import { Tags, Plus } from "lucide-react";

const PLACEHOLDER_BRANDS = [
  { name: "Peak Athletics", vendor: "Acme Corp", status: "Active", variant: "green" as const },
  { name: "Urban Edge", vendor: "Beta Supply Co", status: "Pending", variant: "yellow" as const },
  { name: "Terra Outfitters", vendor: "Gamma Brands", status: "Draft", variant: "gray" as const },
];

export default function BrandsPage() {
  return (
    <div>
      <PageHeader
        title="Brands"
        description="Manage brand profiles and vendor-brand associations."
        actions={
          <Button disabled>
            <Plus className="h-4 w-4" />
            New Brand
          </Button>
        }
      />

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 font-medium text-gray-600">Brand Name</th>
                <th className="px-5 py-3 font-medium text-gray-600">Vendor</th>
                <th className="px-5 py-3 font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 font-medium text-gray-600">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PLACEHOLDER_BRANDS.map((brand) => (
                <tr key={brand.name} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                        <Tags className="h-4 w-4 text-gray-500" />
                      </div>
                      <span className="font-medium text-gray-900">{brand.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-700">{brand.vendor}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill label={brand.status} variant={brand.variant} />
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* TODO: fetch brands from Firestore */}
        <div className="border-t border-gray-200 px-5 py-3 text-xs text-gray-400">
          Showing placeholder data
        </div>
      </Card>
    </div>
  );
}
