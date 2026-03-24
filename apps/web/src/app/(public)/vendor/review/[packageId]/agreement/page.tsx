import { VendorPageShell } from "@/components/vendor";
import { Button } from "@/components/ui";

export default async function ReviewAgreementPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;

  return (
    <VendorPageShell
      title="Agreement Review"
      description="Review the full terms and conditions of the vendor agreement."
    >
      <div className="space-y-4">
        <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
          <h4 className="text-sm font-medium text-gray-900">Agreement Terms</h4>
          <p className="mt-1 text-sm text-gray-500">
            The complete agreement text will appear here once generated from the active terms version.
          </p>
          {/* TODO: render agreement content from terms version + clause library */}
        </div>

        <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
          <h4 className="text-sm font-medium text-gray-900">Supporting Documents</h4>
          <p className="mt-1 text-sm text-gray-500">
            Any attached documents will be listed here.
          </p>
          {/* TODO: list attached documents */}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <Button variant="ghost" disabled>
            Request Changes
          </Button>
          <Button disabled>Proceed to Signature</Button>
        </div>
        {/* TODO: implement change request flow */}
      </div>
    </VendorPageShell>
  );
}
