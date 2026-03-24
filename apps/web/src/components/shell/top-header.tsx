"use client";

import { Bell, Search, User, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";

export function TopHeader() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/auth/session", { method: "DELETE" });
      await signOut(auth);
    } catch {
      // Best-effort — clear cookie even if Firebase signOut fails
    }
    router.replace("/login");
  }

  return (
    <header className="fixed left-[var(--spacing-sidebar-width)] right-0 top-0 z-20 flex h-[var(--spacing-header-height)] items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Search placeholder */}
      <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5">
        <Search className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-400">Search vendors, quotes, agreements…</span>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-gray-700">Admin User</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
