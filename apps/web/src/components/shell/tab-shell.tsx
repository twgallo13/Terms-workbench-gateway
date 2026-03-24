"use client";

import { clsx } from "clsx";
import { useState, type ReactNode } from "react";

interface Tab {
  key: string;
  label: string;
  content: ReactNode;
}

interface TabShellProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function TabShell({ tabs, defaultTab }: TabShellProps) {
  const [activeKey, setActiveKey] = useState(defaultTab ?? tabs[0]?.key ?? "");
  const activeTab = tabs.find((t) => t.key === activeKey);

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveKey(tab.key)}
              className={clsx(
                "whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors",
                tab.key === activeKey
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="pt-5">{activeTab?.content}</div>
    </div>
  );
}
