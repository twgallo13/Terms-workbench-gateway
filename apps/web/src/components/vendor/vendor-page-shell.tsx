import type { ReactNode } from "react";

interface VendorPageShellProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * Card-style page shell for vendor-facing content sections.
 */
export function VendorPageShell({ title, description, children }: VendorPageShellProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
