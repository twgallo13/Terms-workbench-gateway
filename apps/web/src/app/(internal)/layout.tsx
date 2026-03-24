import { InternalAuthGuard } from "@/lib/guards";
import { AppShell } from "@/components/shell";

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <InternalAuthGuard>
      <AppShell>{children}</AppShell>
    </InternalAuthGuard>
  );
}
