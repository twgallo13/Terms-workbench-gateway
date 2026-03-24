import type { ReactNode } from "react";

interface VendorReviewLayoutProps {
  children: ReactNode;
}

/**
 * Top-level layout for the vendor-facing review experience.
 * Simple, professional, mobile-friendly.
 */
export function VendorReviewLayout({ children }: VendorReviewLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Vendor header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-3xl items-center px-4">
          <span className="text-sm font-semibold text-gray-900">
            Shiekh Shoes — Vendor Portal
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Shiekh Shoes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
