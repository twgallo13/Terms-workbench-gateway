import { AppShell } from "@/components/shell";
import { InternalAuthGuard } from "@/lib/guards";

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <InternalAuthGuard>
      <AppShell>{children}</AppShell>
    </InternalAuthGuard>
  );
}
