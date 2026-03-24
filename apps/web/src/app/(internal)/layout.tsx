import { InternalAuthGuard } from "@/lib/guards";
import { AppShell } from "@/components/shell";
import { requireInternalUser } from "@/lib/auth/session";

export default async function InternalLayout({ children }: { children: React.ReactNode }) {
  // Server-side session check — redirects to /login if no valid session
  await requireInternalUser();

  return (
    <InternalAuthGuard>
      <AppShell>{children}</AppShell>
    </InternalAuthGuard>
  );
}
