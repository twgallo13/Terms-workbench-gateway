import { VendorPageShell } from "@/components/vendor";
import { Button } from "@/components/ui";

export default async function ReviewQuotePage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;

  return (
    <VendorPageShell
      title="Quote Review"
      description="Review the pricing terms and conditions offered for your brand."
    >
      <div className="space-y-4">
        <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
          <h4 className="text-sm font-medium text-gray-900">Pricing Summary</h4>
          <p className="mt-1 text-sm text-gray-500">
            Pricing details will be displayed here once the quote has been generated.
          </p>
          {/* TODO: display quote pricing profile, fees, and services */}
        </div>

        <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
          <h4 className="text-sm font-medium text-gray-900">Operational Terms</h4>
          <p className="mt-1 text-sm text-gray-500">
            Shipping, returns, and operational expectations will be listed here.
          </p>
          {/* TODO: display operational profile details */}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <Button variant="ghost" disabled>
            Request Changes
          </Button>
          <Button disabled>Accept Quote</Button>
        </div>
        {/* TODO: implement accept/reject flow */}
      </div>
    </VendorPageShell>
  );
}
