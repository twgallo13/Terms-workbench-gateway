import type { ReactNode } from "react";

interface VendorSummaryActionProps {
  summary: ReactNode;
  action?: ReactNode;
}

/**
 * Summary + action area for vendor review pages (e.g., accept, sign, request changes).
 */
export function VendorSummaryAction({ summary, action }: VendorSummaryActionProps) {
  return (
    <div className="mb-6 flex items-start justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex-1">{summary}</div>
      {action && <div className="ml-4 shrink-0">{action}</div>}
    </div>
  );
}
