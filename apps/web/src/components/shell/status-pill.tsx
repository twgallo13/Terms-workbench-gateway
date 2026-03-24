import { clsx } from "clsx";

type PillVariant = "gray" | "blue" | "green" | "yellow" | "red" | "purple";

const VARIANT_CLASSES: Record<PillVariant, string> = {
  gray: "bg-gray-100 text-gray-700",
  blue: "bg-blue-50 text-blue-700",
  green: "bg-green-50 text-green-700",
  yellow: "bg-yellow-50 text-yellow-700",
  red: "bg-red-50 text-red-700",
  purple: "bg-purple-50 text-purple-700",
};

interface StatusPillProps {
  label: string;
  variant?: PillVariant;
}

export function StatusPill({ label, variant = "gray" }: StatusPillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        VARIANT_CLASSES[variant],
      )}
    >
      {label}
    </span>
  );
}
