"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "◫" },
  { label: "Vendors", href: "/vendors", icon: "🏢" },
  { label: "Brands", href: "/brands", icon: "🏷" },
  { label: "Contacts", href: "/contacts", icon: "👤" },
  { label: "Quotes", href: "/quotes", icon: "📋" },
  { label: "Agreements", href: "/agreements", icon: "📄" },
  { label: "Documents", href: "/documents", icon: "📁" },
  { label: "WB Handoffs", href: "/wb-handoffs", icon: "🔄" },
  { label: "Tasks", href: "/tasks", icon: "☑" },
  { label: "Activity Log", href: "/activity-log", icon: "📜" },
  { label: "Reports", href: "/reports", icon: "📊" },
  { label: "Notifications", href: "/notifications", icon: "🔔" },
  { label: "Settings", href: "/settings", icon: "⚙" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        width: "var(--sidebar-width)",
        background: "var(--color-bg-sidebar)",
        color: "var(--color-text-inverse)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          height: "var(--header-height)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          fontWeight: 700,
          fontSize: "16px",
          letterSpacing: "0.5px",
        }}
      >
        TWG
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 0" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 16px",
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
                background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                textDecoration: "none",
                fontSize: "13px",
                borderRadius: "4px",
                margin: "2px 8px",
              }}
            >
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
