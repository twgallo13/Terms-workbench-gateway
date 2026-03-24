import { PageHeader } from "@/components/shell";
import { requireInternalUser } from "@/lib/auth/session";
import { getVendors } from "./actions";
import { VendorsTable } from "./vendors-table";

export default async function VendorsPage() {
  const user = await requireInternalUser();
  const vendors = await getVendors();
  const canManage = user.category === "internal";

  return (
    <div>
      <PageHeader
        title="Vendors"
        description="Manage vendor accounts, profiles, and onboarding status."
      />
      <VendorsTable vendors={vendors} canManage={canManage} />
    </div>
  );
}
