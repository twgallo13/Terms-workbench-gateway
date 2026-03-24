import type { ReactNode } from "react";

interface RightRailProps {
  children: ReactNode;
  title?: string;
}

/**
 * Right rail placeholder — collapsible sidebar for detail views.
 * TODO: implement expand/collapse toggle and responsive behavior.
 */
export function RightRail({ children, title }: RightRailProps) {
  return (
    <aside className="w-72 shrink-0 border-l border-gray-200 bg-white p-5">
      {title && (
        <h3 className="mb-4 text-sm font-semibold text-gray-900">{title}</h3>
      )}
      {children}
    </aside>
  );
}
