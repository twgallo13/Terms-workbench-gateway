import { PageHeader } from "@/components/shell";
import { requireInternalUser } from "@/lib/auth/session";
import { getBrands, getVendorsForPicker } from "./actions";
import { BrandsTable } from "./brands-table";

export default async function BrandsPage() {
  const user = await requireInternalUser();
  const [brands, vendors] = await Promise.all([
    getBrands(),
    getVendorsForPicker(),
  ]);
  const canManage = user.category === "internal";

  return (
    <div>
      <PageHeader
        title="Brands"
        description="Manage brand profiles and vendor-brand associations."
      />
      <BrandsTable brands={brands} vendors={vendors} canManage={canManage} />
    </div>
  );
}
