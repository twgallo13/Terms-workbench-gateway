import { PageHeader } from "@/components/shell";
import { requireInternalUser } from "@/lib/auth/session";
import { getSites } from "./actions";
import { SitesTable } from "./sites-table";

export default async function SitesPage() {
  const user = await requireInternalUser();
  const sites = await getSites();
  const canManage = user.role === "owner";

  return (
    <div>
      <PageHeader
        title="Sites"
        description="Manage storefronts and selling destinations approved for vendor brands."
      />
      <SitesTable sites={sites} canManage={canManage} />
    </div>
  );
}
