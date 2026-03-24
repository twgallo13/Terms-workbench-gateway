"use client";

export function TopHeader() {
  return (
    <header
      style={{
        height: "var(--header-height)",
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "var(--color-bg)",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Breadcrumbs slot */}
        <Breadcrumbs />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* TODO: notification bell, user avatar/menu */}
        <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
          Phase 0 — Scaffold
        </span>
      </div>
    </header>
  );
}

function Breadcrumbs() {
  // TODO: implement dynamic breadcrumb generation from route segments
  return (
    <nav style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
      <span>TWG</span>
    </nav>
  );
}
