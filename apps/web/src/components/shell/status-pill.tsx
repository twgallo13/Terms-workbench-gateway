export function StatusPill({
  status,
  color,
}: {
  status: string;
  color?: "green" | "yellow" | "red" | "blue" | "gray";
}) {
  const colorMap: Record<string, string> = {
    green: "var(--color-success)",
    yellow: "var(--color-warning)",
    red: "var(--color-danger)",
    blue: "var(--color-info)",
    gray: "var(--color-text-secondary)",
  };
  const bg = colorMap[color ?? "gray"] ?? colorMap.gray;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: 500,
        color: "#fff",
        background: bg,
      }}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
