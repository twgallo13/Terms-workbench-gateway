import { VendorPageShell } from "@/components/vendor";
import { StatusPill } from "@/components/shell";

export default async function ReviewSitesPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;

  const SEED_SITES = [
    { name: "Shiekh.com", status: "Approved", variant: "green" as const },
    { name: "Karmaloop.com", status: "Pending", variant: "yellow" as const },
    { name: "MLTD.com", status: "Pending", variant: "yellow" as const },
  ];

  return (
    <VendorPageShell
      title="Approved Sites"
      description="The following sites have been included in your vendor agreement."
    >
      <div className="divide-y divide-gray-100">
        {SEED_SITES.map((site) => (
          <div
            key={site.name}
            className="flex items-center justify-between py-3"
          >
            <span className="text-sm font-medium text-gray-900">{site.name}</span>
            <StatusPill label={site.status} variant={site.variant} />
          </div>
        ))}
      </div>
      {/* TODO: fetch site approvals for this package from Firestore */}
    </VendorPageShell>
  );
}
