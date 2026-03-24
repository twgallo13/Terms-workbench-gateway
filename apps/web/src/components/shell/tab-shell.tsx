"use client";

import { useState, type ReactNode } from "react";

export function TabShell({
  tabs,
}: {
  tabs: { key: string; label: string; content: ReactNode }[];
}) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key ?? "");

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "0",
          borderBottom: "1px solid var(--color-border)",
          marginBottom: "16px",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveKey(tab.key)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderBottom: activeKey === tab.key ? "2px solid var(--color-primary)" : "2px solid transparent",
              background: "transparent",
              cursor: "pointer",
              fontWeight: activeKey === tab.key ? 600 : 400,
              color: activeKey === tab.key ? "var(--color-primary)" : "var(--color-text-secondary)",
              fontSize: "13px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((t) => t.key === activeKey)?.content}</div>
    </div>
  );
}
