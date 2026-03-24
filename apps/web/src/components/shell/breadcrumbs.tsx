"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

/** Segment label overrides for display */
const LABEL_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  vendors: "Vendors",
  brands: "Brands",
  contacts: "Contacts",
  quotes: "Quotes",
  agreements: "Agreements",
  sites: "Sites",
  documents: "Documents",
  "wb-handoffs": "WB Handoffs",
  tasks: "Tasks",
  "activity-log": "Activity Log",
  notifications: "Notifications",
  reports: "Reports",
  settings: "Settings",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = LABEL_MAP[seg] ?? decodeURIComponent(seg);
    const isLast = i === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500">
      <Link href="/dashboard" className="hover:text-gray-700">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 text-gray-400" />
          {crumb.isLast ? (
            <span className="font-medium text-gray-900">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-gray-700">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
