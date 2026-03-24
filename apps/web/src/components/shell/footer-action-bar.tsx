import type { ReactNode } from "react";

interface FooterActionBarProps {
  children: ReactNode;
}

/**
 * Sticky footer action bar for detail pages with save/cancel/submit actions.
 * TODO: implement sticky positioning behavior on scroll.
 */
export function FooterActionBar({ children }: FooterActionBarProps) {
  return (
    <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-200 bg-white pt-4">
      {children}
    </div>
  );
}
