"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  Building2,
  Tags,
  Users,
  FileText,
  FileSignature,
  FolderOpen,
  ArrowRightLeft,
  CheckSquare,
  Bell,
  BarChart3,
  ClipboardList,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Vendors", href: "/vendors", icon: Building2 },
  { label: "Brands", href: "/brands", icon: Tags },
  { label: "Contacts", href: "/contacts", icon: Users },
  { label: "Quotes", href: "/quotes", icon: FileText },
  { label: "Agreements", href: "/agreements", icon: FileSignature },
  { label: "Documents", href: "/documents", icon: FolderOpen },
  { label: "WB Handoffs", href: "/wb-handoffs", icon: ArrowRightLeft },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Activity Log", href: "/activity-log", icon: ClipboardList },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[var(--spacing-sidebar-width)] flex-col bg-sidebar-bg text-sidebar-text">
      {/* Logo / App name */}
      <div className="flex h-[var(--spacing-header-height)] items-center border-b border-white/10 px-5">
        <span className="text-base font-semibold tracking-tight text-white">
          Terms Workbench
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-active text-white"
                      : "text-sidebar-text hover:bg-sidebar-hover hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-5 py-3">
        <p className="text-xs text-gray-500">Phase 0 · Scaffold</p>
      </div>
    </aside>
  );
}
