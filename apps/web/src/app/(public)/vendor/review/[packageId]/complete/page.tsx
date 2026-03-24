import { VendorPageShell } from "@/components/vendor";
import { CheckCircle } from "lucide-react";

export default async function ReviewCompletePage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;

  return (
    <VendorPageShell title="Review Complete">
      <div className="flex flex-col items-center py-8 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
        <h3 className="text-lg font-semibold text-gray-900">
          Thank you for completing your review
        </h3>
        <p className="mt-2 max-w-md text-sm text-gray-600">
          Your signed agreement has been submitted. The Shiekh Shoes team will
          review your submission and follow up with next steps.
        </p>
        <p className="mt-4 text-xs text-gray-400">
          Reference: {packageId}
        </p>
      </div>
      {/* TODO: display summary of what was signed and confirmation details */}
    </VendorPageShell>
  );
}
