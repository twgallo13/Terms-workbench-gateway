import { VendorPageShell } from "@/components/vendor";
import { Button } from "@/components/ui";

export default async function ReviewSignPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;

  return (
    <VendorPageShell
      title="Signature and Acceptance"
      description="Review and electronically sign the vendor agreement."
    >
      <div className="space-y-6">
        <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
          <h4 className="text-sm font-medium text-gray-900">Signer Information</h4>
          <dl className="mt-3 space-y-2 text-sm">
            {[
              ["Full Name", "—"],
              ["Title", "—"],
              ["Email", "—"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-gray-500">{label}</dt>
                <dd className="font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
          {/* TODO: populate from signer assignment */}
        </div>

        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            By clicking &ldquo;Accept and Sign&rdquo; below, you agree to the terms and conditions
            outlined in the agreement. This constitutes a legal electronic signature.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" disabled>
            Cancel
          </Button>
          <Button disabled>Accept and Sign</Button>
        </div>
        {/* TODO: implement acceptance flow — record IP, user agent, timestamp */}
        {/* TODO: generate signed PDF via pdf-renderer service */}
      </div>
    </VendorPageShell>
  );
}
