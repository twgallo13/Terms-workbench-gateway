import { PageHeader } from "@/components/shell";
import { requireInternalUser } from "@/lib/auth/session";
import { getContacts } from "./actions";
import { getVendorsForPicker } from "../brands/actions";
import { ContactsTable } from "./contacts-table";

export default async function ContactsPage() {
  const user = await requireInternalUser();
  const [contacts, vendors] = await Promise.all([
    getContacts(),
    getVendorsForPicker(),
  ]);
  const canManage = user.category === "internal";

  return (
    <div>
      <PageHeader
        title="Contacts"
        description="Manage vendor and brand contacts across all accounts."
      />
      <ContactsTable
        contacts={contacts}
        vendors={vendors}
        canManage={canManage}
      />
    </div>
  );
}
