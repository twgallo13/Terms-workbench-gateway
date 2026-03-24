"use client";

import { type ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TopHeader } from "./top-header";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopHeader />
        <main style={{ flex: 1, overflow: "auto", padding: "24px", background: "var(--color-bg-secondary)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
