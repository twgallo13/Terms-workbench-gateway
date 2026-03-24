import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TopHeader } from "./top-header";
import { Breadcrumbs } from "./breadcrumbs";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <TopHeader />
      <main className="ml-[var(--spacing-sidebar-width)] pt-[var(--spacing-header-height)]">
        <div className="px-6 py-5">
          <div className="mb-4">
            <Breadcrumbs />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
