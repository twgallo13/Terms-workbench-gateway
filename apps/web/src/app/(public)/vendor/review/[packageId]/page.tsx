import { VendorSummaryAction, VendorPageShell } from "@/components/vendor";
import { StatusPill } from "@/components/shell";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const REVIEW_SECTIONS = [
  { label: "Quote Review", href: "quote", status: "Pending" },
  { label: "Approved Sites", href: "sites", status: "Pending" },
  { label: "Agreement Review", href: "agreement", status: "Pending" },
  { label: "Signature and Acceptance", href: "sign", status: "Pending" },
];

export default async function ReviewPackageSummaryPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;

  return (
    <div className="space-y-6">
      <VendorSummaryAction
        summary={
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Review Package
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Package ID: {packageId}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Please review each section below and accept or request changes to proceed.
            </p>
          </div>
        }
      />

      <VendorPageShell title="Review Sections">
        <ul className="divide-y divide-gray-100">
          {REVIEW_SECTIONS.map((section) => (
            <li key={section.href}>
              <Link
                href={`/vendor/review/${packageId}/${section.href}`}
                className="flex items-center justify-between px-1 py-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900">
                    {section.label}
                  </span>
                  <StatusPill label={section.status} variant="yellow" />
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </li>
          ))}
        </ul>
        {/* TODO: dynamically list sections based on package layout */}
      </VendorPageShell>
    </div>
  );
}
